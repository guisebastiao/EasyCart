import { LoginSchemaType, loginSchema } from "@/schemas/loginSchema";
import { AppStackParamList } from "@/types/NavegationProps";
import { useNavigation } from "@react-navigation/native";
import imgHeader from "../../../assets/img-header.png";
import { useAuthContext } from "@/context/AuthContext";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Text, View, Image } from "react-native";
import { styles } from "@/pages/Login/style";
import { useLogin } from "@/hooks/useAuth";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useEffect } from "react";

const Login = () => {
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const { authenticate } = useAuthContext();

  const { mutate, isPending, isSuccess, data: response } = useLogin();

  const navegation = useNavigation<AppStackParamList>();

  const handleLogin = async () => {
    const data = form.getValues();
    mutate(data);
  };

  useEffect(() => {
    if (isSuccess) {
      console.log(isSuccess, response.data.token);
      authenticate(response.data.token);
    }
  }, [isSuccess]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={imgHeader}
        resizeMode="contain"
      />
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputs}>
        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <Input
              type="text"
              name="E-mail"
              msgError={fieldState.error}
              onChangeText={field.onChange}
              placeholder="Enter your e-mail"
            />
          )}
        />
        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <Input
              type="password"
              name="Password"
              msgError={fieldState.error}
              onChangeText={field.onChange}
              placeholder="Enter your password"
            />
          )}
        />
      </View>
      <View style={styles.buttons}>
        <Button
          type="default"
          name="Login"
          style={styles.button}
          onPress={form.handleSubmit(handleLogin)}
          isLoading={isPending}
        />
        <Button
          type="secondary"
          name="Register"
          style={styles.button}
          onPress={() => navegation.navigate("register")}
          disabled={isPending}
        />
      </View>
      <View style={styles.forgot}>
        <Text style={styles.forgotText}>Forgot my password</Text>
      </View>
    </View>
  );
};

export default Login;
