### Synopsis

ReferenceSearchInput react component

### Props Reference

| Name                           | Type                     | Description                                                                                             |
| ------------------------------ | :----------------------  | -----------------------------------------------------------                                             |
| id                             | string                   | Id of component                                                                                         |
| name                           | string                   | Name of component                                                                                       |
| value                          | oneOfType: array, object | Current value of component. *Note*: if **multiple** prop is *true*, **value** must be array of objects. |
| onChange                       | func                     | Callback fired when the **value** changes                                                               |
| onFocus                        | func                     | Callback fired when the component take focus                                                            |
| onBlur                         | func                     | Callback fired when the component loose focus                                                           |
| multiple                       | bool                     | Allows to select several elements. *Note*: if *true*, **value** must be array of objects.               |
| readOnly                       | bool                     | Disallows any interaction with the component.                                                           |
| disabled                       | bool                     | Disallows any interaction with the component.                                                           |
| referenceSearchAction          | func                     | Callback fired when search action initiated.                                                            |
| labelProperty                  | string                   | Value which is displayed in select options.                                                             |
| valueProperty                  | string                   | Unique value for object identifying in select options.                                                  |
| modalSpecificProps             | string                   | Specific for Modal component props like 'onHide', 'onEnter', etc.                                       |
| ...ReferenceSearchDialogProps  |                          | See `ReferenceSearchDialogProps/index.js` file for details.                                             |

### Code Example

```
<ReferenceSearchInput
  title="ReferenceSearchInput"
  searchFields={[{ name: 'id', label: 'ID' }, { name: 'name', label: 'Name' }]}
  resultFields={[{ name: 'id', label: 'ID' }, { name: 'name', label: 'Name' }]}
  referenceSearchAction={(searchParams, callback) => {
    return callback({
      count: 12,
      items: [
        {"id": "1", "name": "example1"},
        {"id": "2", "name": "example2"},
        {"id": "3", "name": "example3"},
        {"id": "4", "name": "example4"},
        {"id": "5", "name": "example5"},
        {"id": "6", "name": "example6"},
        {"id": "7", "name": "example7"},
        {"id": "8", "name": "example8"},
        {"id": "9", "name": "example9"},
        {"id": "10", "name": "example10"},
        {"id": "11", "name": "example11"},
        {"id": "12", "name": "example12"}
      ]
    })
  }}
  labelProperty="_objectLabel"
  valueProperty="id"
  value={{ id: "1" }}
  serviceRegistry={serviceName => ({ url: "http://localhost:3000" })}
/>
```

### Contributors

Alexey Sergeev, Dmitriy Sanko

### Component Name

ReferenceSearchInput

### License

Licensed by © 2017 OpusCapita 

