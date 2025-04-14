import { RegisterSchemaType, registerSchema } from "@/schemas/RegisterSchema";
import { AppStackParamList } from "@/types/NavegationProps";
import { useNavigation } from "@react-navigation/native";
import imgHeader from "../../../assets/img-header.png";
import { useAuthContext } from "@/context/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Text, View, Image } from "react-native";
import { styles } from "@/pages/Register/style";
import { useRegister } from "@/hooks/useAuth";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useEffect } from "react";

const Register = () => {
  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const { authenticate } = useAuthContext();

  const { mutate, isPending, isSuccess, data: response } = useRegister();

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
      <Text style={styles.title}>Register</Text>
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
        <Controller
          control={form.control}
          name="passwordConfirm"
          render={({ field, fieldState }) => (
            <Input
              type="password"
              name="Confirm Password"
              msgError={fieldState.error}
              onChangeText={field.onChange}
              placeholder="Confirm your password"
            />
          )}
        />
      </View>
      <View style={styles.buttons}>
        <Button
          type="default"
          name="Register"
          style={styles.button}
          onPress={form.handleSubmit(handleLogin)}
          isLoading={isPending}
        />
        <Button
          type="secondary"
          name="Login"
          style={styles.button}
          onPress={() => navegation.navigate("login")}
          disabled={isPending}
        />
      </View>
    </View>
  );
};

export default Register;
