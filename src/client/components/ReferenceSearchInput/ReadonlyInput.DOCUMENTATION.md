### Synopsis

ReadonlyInput react component. **It is not a reference-search.** It is just an UI component

### Props Reference

| Name                           | Type                     | Description                                                                                             |
| ------------------------------ | :----------------------  | -----------------------------------------------------------                                             |
| ... ReferenceSearchBaseProps   |                          |                                                                                                         |
| labelProperty                  | string                   | Value which is displayed in select options.                                                             |
| valueProperty                  | string                   | Unique value for object identifying in select options.                                                  |
| value                          | oneOfType: array, object | Current value of component. *Note*: if **multiple** prop is *true*, **value** must be array of objects. |

### Component Name

ReadonlyInput

### Code Example

```
<ReadonlyInput
  labelProperty="value1"
  valueProperty="value2"
  value={{
     value1: 'Value-1',
     value2: 'Value-2'
   }}
/>
```

### License

Licensed by © 2017 OpusCapita 
