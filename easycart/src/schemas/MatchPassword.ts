import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ name: "MatchPasswords", async: false })
export class MatchPasswords implements ValidatorConstraintInterface {
  validate(passwordConfirm: string, args: ValidationArguments) {
    const object = args.object as any;
    return object.password === passwordConfirm;
  }

  defaultMessage() {
    return "As senhas não se correspondem";
  }
}
