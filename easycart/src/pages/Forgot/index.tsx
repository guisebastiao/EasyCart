import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useGenerateResetPassword } from "@/hooks/useForgotPassword";
import { ForgotPasswordSchema } from "@/schemas/ForgotPassword";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { PublicStackRoutes } from "@/routes/index";
import { styles } from "@/pages/Forgot/style";
import { Text, View } from "react-native";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useEffect } from "react";

const RESET_FIELD_TIME = 3000;
type NavigationProp = StackNavigationProp<PublicStackRoutes>;

const Forgot = () => {
  const form = useForm<ForgotPasswordSchema>({
    resolver: classValidatorResolver(ForgotPasswordSchema),
    mode: "onChange",
  });

  const { mutate, isPending } = useGenerateResetPassword();

  const navegation = useNavigation<NavigationProp>();

  const handleSubmit = () => {
    mutate(form.getValues());
    form.reset();
  };

  const { errors } = form.formState;

  useEffect(() => {
    if (errors.email) {
      const timeout = setTimeout(() => {
        form.clearErrors();
      }, RESET_FIELD_TIME);

      return () => clearTimeout(timeout);
    }
  }, [errors, form]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar Senha</Text>
      <Text style={styles.description}>
        Informe o e-mail de sua conta, ao clicar enviar você receberá um e-mail
        para poder recuperar sua senha.
      </Text>
      <Controller
        control={form.control}
        name="email"
        render={({ field, fieldState }) => (
          <Input
            type="text"
            label="E-mail"
            fieldError={fieldState.error}
            value={field.value}
            onChangeText={field.onChange}
            placeholder="Informe seu email"
          />
        )}
      />
      <View style={styles.buttonsContent}>
        <Button
          type="default"
          name="Enviar"
          style={styles.button}
          onPress={handleSubmit}
          isLoading={isPending}
        />
        <Button
          type="secondary"
          name="Voltar"
          style={styles.button}
          disabled={isPending}
          onPress={() => {
            navegation.navigate("login");
          }}
        />
      </View>
    </View>
  );
};

export default Forgot;
