## [2026-05-31] Combobox division

**Context:**  
Component combobox have two variants: simple and group where group add a section label.

**Decision:**  
Two components are created: `combobox` and `comboboxgroup`.

**Consequences:**  
Improve clarity and flexibility in the use of simple list and grouped list.

## [2026-05-31] Use `title` as wizardInput identifier

**Context:**  
Every component need an identifier to make groups, sections, tabs, etc.

**Decision:**  
All components in `WizardInput` need the attribute `title` even if component props don't say so.

**Consequences:**  
Improve clarity and identification of every single component.

## [2026-05-31] Use `title` as id and htmlFor

**Context:**  
Every input have an id but not every input have `fieldLabel`.

**Decision:**  
Now the input id is 'input-field-${`title`}' to have id in case we don't want to add `fieldLabel`.

**Consequences:**  
Now every input have an unique id.
