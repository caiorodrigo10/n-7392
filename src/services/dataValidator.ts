import { ParsedData } from "./dataParser";

export interface ValidationRule {
  field: string;
  validator: (value: any) => boolean;
  message: string;
}

export class DataValidator {
  private static rules: ValidationRule[] = [
    {
      field: 'value',
      validator: (value: number) => !isNaN(value) && value >= 0,
      message: 'Value must be a non-negative number'
    },
    {
      field: 'key',
      validator: (value: string) => typeof value === 'string' && value.length > 0,
      message: 'Key must be a non-empty string'
    }
  ];

  static validate(data: ParsedData[]): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    data.forEach((item, index) => {
      this.rules.forEach(rule => {
        const value = item[rule.field as keyof ParsedData];
        if (!rule.validator(value)) {
          errors.push(`Item ${index}: ${rule.message}`);
        }
      });
    });

    return {
      valid: errors.length === 0,
      errors
    };
  }

  static addRule(rule: ValidationRule): void {
    this.rules.push(rule);
  }
}