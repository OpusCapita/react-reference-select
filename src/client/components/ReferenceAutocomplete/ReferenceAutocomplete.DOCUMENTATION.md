### Synopsis

ReferenceAutocomplete react component

### Props Reference

| Name                           | Type                     | Description                                                                                             |
| ------------------------------ | :----------------------  | -----------------------------------------------------------                                             |
| id                             | string                   | Id of component                                                                                         |
| name                           | string                   | Name of component                                                                                       |
| styles                         | object                   | Style modifier methods, see more information [here](https://react-select.com/props#prop-types)          |
| value                          | oneOfType: array, object | Current value of component. *Note*: if **multiple** prop is *true*, **value** must be array of objects. |
| onChange                       | func                     | Callback fired when the **value** changes                                                               |
| onFocus                        | func                     | Callback fired when the component take focus                                                            |
| onBlur                         | func                     | Callback fired when the component loose focus                                                           |
| multiple                       | bool                     | Allows to select several elements. *Note*: if *true*, **value** must be array of objects.               |
| readOnly                       | bool                     | Disallows any interaction with the component.                                                           |
| disabled                       | bool                     | Disallows any interaction with the component.                                                           |
| defaultOptions                 | array                    | Default set of options to show before the user starts searching.
| autocompleteAction             | func                     | Callback fired when the input text is changed for objects loading.                                      |
| labelProperty                  | string                   | Value which is displayed in select options.                                                             |
| valueProperty                  | string                   | Unique value for object identifying in select options.                                                  |
| selectProperty                 | string                   | Value which is displayed in the result field. 
| reactSelectSpecificProps       | shape                    | See `ReactSelectSpecificProps/index.js` file for details.                                               |

### Contributors

Alexey Sergeev, Dmitriy Sanko

### Code Example

```
<ReferenceAutocomplete
  autocompleteAction={(input) => {
    return new Promise((resolve) => {
      var options = [{"id": "1", "_objectLabel": "A"}, {"id": "2", "_objectLabel": "B", inactive: true}, {"id": "3", "_objectLabel": "C"}];
      resolve(options.filter((item) => item._objectLabel.toLowerCase().includes(input.toLowerCase())!== -1));
    });
  }}
  styles={{option: (provided, {data} ) => {
    const customStyles = {}
    if (data.inactive) {
        customStyles.backgroundColor = "#ccc"
        customStyles.color = "white"
    }
    return {
      ...provided,
      ...customStyles
    }
  }}}
  name="alphabet"
  value={{"id": "1", "_objectLabel": "A"}}
  labelProperty="_objectLabel"
  valueProperty="id"
/>
```

### Component Name

ReferenceAutocomplete

### License

Licensed by © 2017 OpusCapita 

