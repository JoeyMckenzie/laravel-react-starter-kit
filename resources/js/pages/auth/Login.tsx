import { Button } from "@/components/catalyst/button";
import { Checkbox, CheckboxField } from "@/components/catalyst/checkbox";
import {
    Description,
    Field,
    FieldGroup,
    Fieldset,
    Label,
} from "@/components/catalyst/fieldset";
import { Heading } from "@/components/catalyst/heading";
import { Input } from "@/components/catalyst/input";
import { Link } from "@/components/catalyst/link";
import { Text } from "@/components/catalyst/text";
import GuestLayout from "@/layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import { type FormEventHandler, useEffect } from "react";

export default function Login({
    status,
    canResetPassword,
}: { status?: string; canResetPassword: boolean }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    // biome-ignore lint/correctness/useExhaustiveDependencies: reset only used on mount
    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 font-medium text-green-600 text-sm">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <Fieldset>
                    <div className="space-y-2 text-center">
                        <Heading>Login</Heading>
                        <Text>
                            Enter your email below to login to your account.
                        </Text>
                    </div>
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="john.smith@example.com"
                                required
                                name="email"
                                value={data.email}
                                className="block w-full"
                                autoComplete="username"
                                autoFocus
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                            {errors.email && (
                                <Description className="text-red-500">
                                    {errors.email}
                                </Description>
                            )}
                        </Field>
                        <Field>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                name="password"
                                value={data.password}
                                className="block w-full"
                                autoComplete="current-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />
                            {errors.password && (
                                <Description className="text-red-500">
                                    {errors.password}
                                </Description>
                            )}
                        </Field>
                        <Field className="flex flex-row items-center justify-between">
                            <CheckboxField>
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(checked) =>
                                        setData("remember", checked)
                                    }
                                />

                                <Label>Remember me</Label>
                            </CheckboxField>
                            {canResetPassword && (
                                <Link
                                    href={route("password.request")}
                                    className="rounded-md text-sm underline focus:outline-none focus:ring-2 focus:ring-offset-2"
                                >
                                    Forgot your password?
                                </Link>
                            )}
                        </Field>
                        <Field>
                            <Button
                                className="w-full"
                                disabled={processing}
                                color="dark/zinc"
                                type="submit"
                            >
                                Sign in
                            </Button>
                        </Field>
                    </FieldGroup>
                </Fieldset>
            </form>
        </GuestLayout>
    );
}
