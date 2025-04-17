import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useDeleteItem, useUpdateItem } from "@/hooks/useItem";
import { ItemEditSchema } from "@/schemas/ItemSchema";
import { Controller, useForm } from "react-hook-form";
import { styles } from "@/components/EditItem/style";
import { ItemResponse } from "@/types/ItemResponse";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Button from "@/components/Button";
import { colors } from "@/styles/colors";
import Input from "@/components/Input";
import Alert from "@/components/Alert";
import { Units } from "@/types/Units";
import DropDown from "../DropDown";

interface EditItemProps extends ItemResponse {
  onClose: () => void;
}

const values = Object.values(Units);
const RESET_FIELD_TIME = 3000;

const EditItem = ({
  id,
  content,
  quantity,
  measurementUnit,
  complete,
  onClose,
}: EditItemProps) => {
  const [alertIsVisible, setAlertIsVisible] = useState(false);

  const form = useForm<ItemEditSchema>({
    resolver: classValidatorResolver(ItemEditSchema),
    mode: "onChange",
    defaultValues: {
      id,
      content,
      quantity,
      measurementUnit,
      complete,
    },
  });

  const {
    mutate: mutateUpdate,
    isPending: pendingUpdate,
    isSuccess: successUpdate,
  } = useUpdateItem();

  const {
    mutate: mutateDelete,
    isPending: pendingDelete,
    isSuccess: successDelete,
  } = useDeleteItem();

  const handleSave = () => {
    const data = form.getValues();
    mutateUpdate({ data, itemId: data.id! });
  };

  const handleDelete = () => {
    mutateDelete(id);
  };

  const handleVisible = () => {
    setAlertIsVisible((prev) => !prev);
  };

  useEffect(() => {
    if (successUpdate || successDelete) {
      onClose();
    }
  }, [successUpdate, successDelete]);

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
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.close} />
        <Text style={styles.title}>Alterar Item</Text>
        <Button
          type="secondary"
          style={styles.button}
          onPress={handleVisible}
          icon={
            <Ionicons
              name="trash-outline"
              size={18}
              color={colors.errorColor}
            />
          }
        />
      </View>
      <View style={styles.inputs}>
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
                  dropDownUp={true}
                />
              )}
            />
          </View>
        </View>
      </View>
      <Button
        type="default"
        name="Salvar Item"
        onPress={handleSave}
        isLoading={pendingUpdate}
      />
      <Alert
        isVisible={alertIsVisible}
        onCancel={handleVisible}
        onSave={handleDelete}
        title="Deletar Item"
        description="Você realmente deseja excluir esse item?"
        isLoading={pendingDelete}
      />
    </View>
  );
};

export default EditItem;
