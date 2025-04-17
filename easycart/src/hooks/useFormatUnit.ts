import { Units } from "@/types/Units";

export const useFormatUnit = (unity: Units) => {
  switch (unity) {
    case Units.UN: {
      return "Unidade";
    }
    case Units.KG: {
      return "Quilo";
    }
    case Units.G: {
      return "Grama";
    }
    case Units.L: {
      return "Litro";
    }
    case Units.ML: {
      return "Mililitro";
    }
    default: {
      return unity;
    }
  }
};
