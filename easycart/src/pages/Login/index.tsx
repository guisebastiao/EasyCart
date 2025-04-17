import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import imgHeader from "../../../assets/img-header.png";
import { useAuthContext } from "@/context/AuthContext";
import { Controller, useForm } from "react-hook-form";
import { LoginSchema } from "@/schemas/LoginSchema";
import { PublicStackRoutes } from "@/routes/index";
import { Text, View, Image } from "react-native";
import { styles } from "@/pages/Login/style";
import { useLogin } from "@/hooks/useAuth";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useEffect } from "react";

const RESET_FIELD_TIME = 3000;
type NavigationProp = StackNavigationProp<PublicStackRoutes>;

const Login = () => {
  const form = useForm<LoginSchema>({
    resolver: classValidatorResolver(LoginSchema),
    mode: "onChange",
  });

  const { authenticate } = useAuthContext();

  const { mutate, isPending, isSuccess, data: response } = useLogin();

  const navegation = useNavigation<NavigationProp>();

  const handleLogin = async () => {
    const data = form.getValues();
    mutate(data);
    form.reset();
  };

  useEffect(() => {
    if (isSuccess) {
      authenticate(response.data.token);
    }
  }, [isSuccess]);

  const { errors } = form.formState;

  useEffect(() => {
    if (errors.email || errors.password) {
      const timeout = setTimeout(() => {
        form.clearErrors();
      }, RESET_FIELD_TIME);

      return () => clearTimeout(timeout);
    }
  }, [errors, form]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={imgHeader}
        resizeMode="contain"
      />
      <Text style={styles.title}>Entrar</Text>
      <View style={styles.inputs}>
        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <Input
              type="text"
              label="E-mail"
              value={field.value}
              fieldError={fieldState.error}
              onChangeText={field.onChange}
              placeholder="Digite seu e-mail"
            />
          )}
        />
        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <Input
              type="password"
              label="Senha"
              value={field.value}
              fieldError={fieldState.error}
              onChangeText={field.onChange}
              placeholder="Digite sua senha"
            />
          )}
        />
      </View>
      <View style={styles.buttons}>
        <Button
          type="default"
          name="Entrar"
          style={styles.button}
          onPress={form.handleSubmit(handleLogin)}
          isLoading={isPending}
        />
        <Button
          type="secondary"
          name="Registrar"
          style={styles.button}
          onPress={() => navegation.navigate("register")}
          disabled={isPending}
        />
      </View>
      <View style={styles.forgot}>
        <Text
          style={styles.forgotText}
          onPress={() => navegation.navigate("forgot")}
        >
          Esquici minha senha
        </Text>
      </View>
    </View>
  );
};

export default Login;
