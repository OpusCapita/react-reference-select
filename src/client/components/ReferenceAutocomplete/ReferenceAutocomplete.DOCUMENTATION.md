### Synopsis

ReferenceAutocomplete react component

### Code Example

```
<ReferenceAutocomplete
  autocompleteAction={() => {
    return new Promise((resolve) => { 
      resolve({"options": [{"id": "1", "_objectLabel": "A"}, {"id": "2", "_objectLabel": "B"}], "complete": false}); 
    }); 
  }}
  value={{"id": "1", "_objectLabel": "A"}}
  labelProperty="_objectLabel"
  valueProperty="id"
/>
```

### Props Reference

| Name                          | Type                  | Description                                                |
| ------------------------------|:----------------------| -----------------------------------------------------------|
| id | string | Id of component |
| name | string | Name of component |
| value | oneOfType: array, object | Current value of component. *Note*: if **multiple** prop is *true*, **value** must be array of objects. |
| onChange | func | Callback fired when the **value** changes |
| onFocus | func | Callback fired when the component take focus |
| onBlur | func | Callback fired when the component loose focus |
| multiple | bool | Allows to select several elements. *Note*: if *true*, **value** must be array of objects. |
| readOnly | bool | Disallows any interaction with the component. |
| disabled | bool | Disallows any interaction with the component. |
| autocompleteAction | func | Callback fired when the input text is changed for objects loading. |
| labelProperty | string | Value which is displayed in select options. |
| valueProperty | string | Unique value for object identifying in select options. |
| reactSelectSpecificProps | shape | See `ReactSelectSpecificProps/index.js` file for details. |

### Contributors
Alexey Sergeev, Dmitriy Sanko

### Component Name

ReferenceAutocomplete

### Tags

ReactReferenceSelect

### License

Licensed by © 2016 OpusCapita 

