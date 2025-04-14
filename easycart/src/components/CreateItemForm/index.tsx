import { itemSchema, ItemSchemaType } from "@/schemas/itemSchema";
import { styles } from "@/components/CreateItemForm/style";
import { QuantityInput } from "@/components/QuantityInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useCreateItem } from "@/hooks/useItem";
import { Ionicons } from "@expo/vector-icons";
import Button from "@/components/Button";
import { colors } from "@/styles/colors";
import Input from "@/components/Input";
import { Units } from "@/types/Units";
import { View } from "react-native";
import { useEffect } from "react";

const ERROR_DURATION = 3000;

const index = () => {
  const form = useForm<ItemSchemaType>({
    resolver: zodResolver(itemSchema),
    mode: "onChange",
    defaultValues: {
      content: "",
      quantity: 1,
      measurementUnit: Units.UN,
      complete: false,
    },
  });

  const { mutate, isPending } = useCreateItem();

  const handleCreateItem = () => {
    mutate(form.getValues());
    form.reset();
  };

  useEffect(() => {
    const hasErrors = Object.keys(form.formState.errors).length > 0;

    if (!hasErrors) return;

    const timeout = setTimeout(() => {
      form.clearErrors();
    }, ERROR_DURATION);

    return () => clearTimeout(timeout);
  }, [form.formState.errors]);

  return (
    <View style={styles.form}>
      <Controller
        control={form.control}
        name="content"
        render={({ field, fieldState }) => (
          <Input
            type="text"
            name="Item"
            value={field.value}
            onChangeText={field.onChange}
            msgError={fieldState.error}
            placeholder="Add your purchase item"
          />
        )}
      />
      <View style={styles.content}>
        <Controller
          control={form.control}
          name="quantity"
          render={({ field, fieldState }) => (
            <QuantityInput
              quantity={field.value}
              onChangeQuantity={field.onChange}
              unit={form.watch("measurementUnit")}
              onChangeUnit={(e) => form.setValue("measurementUnit", e)}
              msgError={fieldState.error}
            />
          )}
        />
        <Button
          type="default"
          onPress={form.handleSubmit(handleCreateItem)}
          icon={
            <Ionicons
              name="add-outline"
              color={colors.gray_100}
              size={24}
            />
          }
          isLoading={isPending}
          style={styles.button}
        />
      </View>
    </View>
  );
};

export default index;
