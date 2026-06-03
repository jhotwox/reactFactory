import { ButtonConfig, WizardInput, WizardInputConfig,  } from './wizard-input'
import { Card, CardTitle, CardDescription, CardContent, CardHeader, CardFooter } from '@/components/ui/card'

export type groupConfig = {
  title: string;
  fields: string[];
}

export type WizardFormConfig = {
  title: string;
  description?: string;
  // fields: WizardInputConfig[];
  // fields: (WizardInputConfig | { type: "divider"; title?: string })[];
  fields: (WizardInputConfig)[];
  agrupation?: groupConfig[];
}

type WizardFormProps = {
  config: WizardFormConfig
}

export function WizardForm({ config }: WizardFormProps) {
  const resetButtonConfig = {
    title: "Reset",
    type: "button",
  } satisfies ButtonConfig;
  
  const saveButtonConfig = {
    title: "Save",
    type: "button",
  } satisfies ButtonConfig;
  
  const agrupation = config.agrupation || [];
  const fields = config.fields || [];

  // Agroup the fields based on the agrupation configuration
  // This will create an array of arrays, where each inner array contains the fields that belong to the same group
  // If a field does not belong to any group, it will be placed in its own group
  // For example, if we have 5 fields and the agrupation is [["field1", "field2"], ["field3"]], then the result will be:
  // [
  //   [field1, field2], // group 1
  //   [field3],         // group 2
  //   [field4],         // group 3 (not in any group)
  //   [field5]          // group 4 (not in any group)
  // ]
  // const groupedFields = agrupation.map(group => {
  //   return fields.filter(field => group.includes(field.title));
  // });
  const groupedFields = agrupation.map(group => {
    // [field1, field2]
    const tempGroup = group.fields.map((title) => {
      // return fields.find(field => field.title === title)
      return fields.filter(field => field.title === title)[0];
    })
    console.log("tempGroup: ", tempGroup);
    return {fields: tempGroup, title: group.title};
  });

  console.log("GroupedFields: ", groupedFields);

  return (
    <Card className='rounded-md'>
      <CardHeader>
        <CardTitle className='text-xl'>{config.title}</CardTitle>
        <CardDescription className='text-lg'>{config?.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {groupedFields.map((group, index) => (
          <div key={index} className="mb-4">
            {group.title && (
              <h3 className="text-lg font-semibold mb-2">{group.title}</h3>
            )}
            {group.fields.map((field, fieldIndex) => (
              <WizardInput key={fieldIndex} config={field} />
            ))}
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <WizardInput config={resetButtonConfig} />
        <WizardInput config={saveButtonConfig} />
      </CardFooter>
    </Card>
  )
}