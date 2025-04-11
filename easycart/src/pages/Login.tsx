import { LoginSchemaType, loginSchema } from "@/schemas/loginSchema";
import { Text, View, Image, StyleSheet } from "react-native";
import { useAuthContext } from "@/context/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { login as loginAuth } from "@/hooks/useAuth";
import imgHeader from "../../assets/img-header.png";
import { useForm } from "react-hook-form";
import Button from "@/components/Button";
import { colors } from "@/styles/colors";
import Input from "@/components/Input";

const Login = () => {
  const loginForm = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  const { authenticate } = useAuthContext();
  const { mutate, isPending, isSuccess, data: response } = loginAuth();

  const handleLogin = async () => {
    const data = loginForm.getValues();
    mutate(data);
  };

  if (isSuccess) {
    authenticate(response.data.token);
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={imgHeader}
        resizeMode="contain"
      />
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputs}>
        <Input
          type="text"
          name="E-mail"
          msg={loginForm.formState.errors.email}
          onChangeText={(text) => loginForm.setValue("email", text)}
          placeholder="Enter your e-mail"
        />
        <Input
          type="password"
          name="Password"
          msg={loginForm.formState.errors.password}
          onChangeText={(text) => loginForm.setValue("password", text)}
          placeholder="Enter your password"
        />
      </View>
      <View style={styles.buttons}>
        <Button
          type="default"
          name="Login"
          style={{ width: "100%" }}
          onPress={loginForm.handleSubmit(handleLogin)}
          isLoading={isPending}
        />
        <Button
          type="secondary"
          name="Register"
          style={{ width: "100%" }}
          disabled={isPending}
        />
      </View>
      <View style={styles.forgot}>
        <Text style={styles.forgotText}>Forgot my password</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: colors.gray_600,
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
    flex: 1,
    gap: 10,
  },
  image: {
    position: "absolute",
    top: -50,
    left: 0,
    width: "100%",
  },
  title: {
    fontFamily: "Inter",
    fontWeight: "700",
    color: colors.gray_100,
    fontSize: 32,
    width: "100%",
    textAlign: "left",
  },
  inputs: {
    width: "100%",
    paddingVertical: 40,
    gap: 10,
  },
  buttons: {
    width: "100%",
    gap: 15,
  },
  forgot: {
    width: "100%",
    paddingVertical: 20,
  },
  forgotText: {
    fontFamily: "Inter",
    fontWeight: "400",
    textDecorationLine: "underline",
    color: colors.gray_200,
    textAlign: "center",
    fontSize: 16,
  },
});

export default Login;
