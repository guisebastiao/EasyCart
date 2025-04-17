import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { ItemCreateSchema } from "@/schemas/ItemSchema";
import { styles } from "@/components/CreateItem/style";
import { useForm, Controller } from "react-hook-form";
import { useCreateItem } from "@/hooks/useItem";
import { Ionicons } from "@expo/vector-icons";
import DropDown from "@/components/DropDown";
import Button from "@/components/Button";
import { colors } from "@/styles/colors";
import Input from "@/components/Input";
import { Units } from "@/types/Units";
import { View } from "react-native";
import { useEffect } from "react";

const RESET_FIELD_TIME = 3000;
const values = Object.values(Units);

const CreateItem = () => {
  const form = useForm<ItemCreateSchema>({
    resolver: classValidatorResolver(ItemCreateSchema),
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
    const data = form.getValues();
    mutate(data);
    form.reset();
  };

  const { errors } = form.formState;

  useEffect(() => {
    if (errors.content || errors.quantity) {
      const timeout = setTimeout(() => {
        form.clearErrors();
      }, RESET_FIELD_TIME);

      return () => clearTimeout(timeout);
    }
  }, [errors, form]);

  return (
    <View style={styles.form}>
      <Controller
        control={form.control}
        name="content"
        render={({ field, fieldState }) => (
          <Input
            type="text"
            label="Item"
            value={field.value}
            onChangeText={field.onChange}
            fieldError={fieldState.error}
            placeholder="Adicione um item para comprar"
          />
        )}
      />
      <View style={styles.contentRow}>
        <View style={styles.inputWrapper}>
          <Controller
            control={form.control}
            name="quantity"
            render={({ field, fieldState }) => (
              <Input
                type="text"
                label="Quantidade"
                keyboardType="decimal-pad"
                value={String(field.value)}
                onChangeText={field.onChange}
                fieldError={fieldState.error}
                style={styles.quantityInput}
                maxLength={9}
              />
            )}
          />
        </View>
        <View style={styles.dropdownWrapper}>
          <Controller
            control={form.control}
            name="measurementUnit"
            render={({ field }) => (
              <DropDown
                values={values}
                value={field.value}
                setValue={field.onChange}
              />
            )}
          />
        </View>
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

export default CreateItem;
