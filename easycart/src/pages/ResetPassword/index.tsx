import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { ResetPasswordSchema } from "@/schemas/ResetPasswordSchema";
import { StackNavigationProp } from "@react-navigation/stack";
import { useResetPassword } from "@/hooks/useForgotPassword";
import { Controller, useForm } from "react-hook-form";
import { styles } from "@/pages/ResetPassword/style";
import { PublicStackRoutes } from "@/routes/index";
import { Text, View } from "react-native";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useEffect } from "react";

type ResetPasswordRouteProp = RouteProp<PublicStackRoutes, "resetPassword">;
type NavigationProp = StackNavigationProp<PublicStackRoutes>;
const RESET_FIELD_TIME = 3000;

const ResetPassword = () => {
  const form = useForm<ResetPasswordSchema>({
    resolver: classValidatorResolver(ResetPasswordSchema),
    mode: "onChange",
  });

  const { params } = useRoute<ResetPasswordRouteProp>();

  const { mutate, isPending, isSuccess } = useResetPassword();

  const navegation = useNavigation<NavigationProp>();

  const handleResetPassword = () => {
    const data = form.getValues();
    mutate({ data, token: params.token });
    form.reset();
  };

  const { errors } = form.formState;

  useEffect(() => {
    if (errors.password || errors.passwordConfirm) {
      const timeout = setTimeout(() => {
        form.clearErrors();
      }, RESET_FIELD_TIME);

      return () => clearTimeout(timeout);
    }
  }, [errors, form]);

  useEffect(() => {
    if (isSuccess) {
      navegation.navigate("login");
    }
  }, [isSuccess]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trocar Senha</Text>
      <View style={styles.form}>
        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <Input
              type="password"
              label="Senha"
              fieldError={fieldState.error}
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Informe a nova senha"
            />
          )}
        />
        <Controller
          control={form.control}
          name="passwordConfirm"
          render={({ field, fieldState }) => (
            <Input
              type="password"
              label="Confirmar Senha"
              fieldError={fieldState.error}
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Repita a nova senha"
            />
          )}
        />
      </View>
      <Button
        type="default"
        name="Salvar"
        style={styles.button}
        onPress={form.handleSubmit(handleResetPassword)}
        isLoading={isPending}
      />
    </View>
  );
};

export default ResetPassword;
