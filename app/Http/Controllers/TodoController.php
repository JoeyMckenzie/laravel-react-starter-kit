<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Enums\TodoStatus;
use App\Models\Todo;
use App\ValueObjects\TodoMetadata;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

final class TodoController extends Controller
{
    public function destroy(Todo $todo): RedirectResponse
    {
        $todo->delete();

        return back();
    }

    public function update(Request $request, Todo $todo): RedirectResponse
    {
        $validated = $request->validate([
            'status' => ['required', Rule::enum(TodoStatus::class)],
        ]);

        $todo->update($validated);

        return back();
    }

    public function index(): Response
    {
        $paginatedTodos = auth()->user()?->todos()->paginate(10);
        $allTodos = auth()->user()?->todos()->get();
        $metadata = new TodoMetadata($allTodos);

        return Inertia::render('Dashboard', [
            'todos' => $paginatedTodos,
            'metadata' => $metadata,
        ]);
    }
}
