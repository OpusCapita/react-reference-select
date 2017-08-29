### Synopsis

ExampleInput react component

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
| serviceRegistry                | func                     | ????? Hard to describe it. ?????                                                                        |
| reactSelectSpecificProps       | shape                    | See `ReactSelectSpecificProps/index.js` file for details.                                               |

### Component Name

ExampleInput

### Code Example

```
<ExampleInput
  serviceRegistry={serviceName => ({ url: 'http://localhost:3000' })}
/>
```

### Contributors

Alexey Sergeev, Dmitriy Sanko

### License

Licensed by © 2017 OpusCapita 

