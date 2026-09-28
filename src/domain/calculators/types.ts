export type Scalar = number | string | boolean;
export type Values = Record<string, Scalar>;

export type CalculatorInput = {
  id: string;
  source_cell: string;
  label: string;
  type: 'number' | string;
  unit: string;
  required: boolean;
};

export type CalculatorFormula = {
  id: string;
  source_cell: string;
  expression: string | null;
  excel_formula: string;
  dependencies: string[];
  display_label: string;
  context_labels: string[];
  number_format: string;
  example_result: Scalar;
  state: 'ready' | string;
};

export type CalculatorOutput = {
  formula_id: string;
  label: string;
};

export type Calculator = {
  id: string;
  title: string;
  category: string;
  row_range: [number, number];
  inputs: CalculatorInput[];
  formulas: CalculatorFormula[];
  outputs: CalculatorOutput[];
  state: 'ready' | string;
  notes: string[];
};

export type CalculatorDataset = {
  schema_version: string;
  name: string;
  categories: string[];
  calculators: Calculator[];
};

export type SelectOption = {
  label: string;
  value: string;
  description?: string;
};

export type InputMeta = {
  label: string;
  unit?: string;
  placeholder?: string;
  step?: number;
  defaultValue?: string;
  options?: SelectOption[];
};

export type OutputMeta = {
  label: string;
  unit?: string;
};

export type CalculatorMeta = {
  description: string;
  resultHint?: string;
  inputs?: Record<string, InputMeta>;
  outputs?: Record<string, OutputMeta>;
};
