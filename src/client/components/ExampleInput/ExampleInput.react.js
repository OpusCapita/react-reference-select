import React from 'react';
import PropTypes from 'prop-types';
import translations from './i18n';
import lodash from 'lodash';
import ReactSelectSpecificProps from '../ReactSelectSpecificProps';
import ReferenceInputBaseProps from '../ReferenceInputBaseProps';
import ReferenceSearchInput from '../ReferenceSearchInput';
import ReferenceAutocomplete from '../ReferenceAutocomplete';
import isServiceRegistryConfiguredFor from '../ServiceRegistryValidator';
import ExampleService from '../../service/ExampleService';
import refreshValueDecorator from "../../utils/refreshValueDecorator.react";
import { getTotalCount } from '../../utils/referenceInputUtils.js';

const SERVICE_NAME = 'example';

const loadExample = (serviceRegistry) => {
  return (id) => {
    return new ExampleService(serviceRegistry(SERVICE_NAME).url).getExample(id);
  }
};

@refreshValueDecorator('id', '_objectLabel', loadExample)
export default class ExampleInput extends React.Component {

  static propTypes = {
    ...ReferenceInputBaseProps,
    reactSelectSpecificProps: PropTypes.shape(ReactSelectSpecificProps),
    serviceRegistry: isServiceRegistryConfiguredFor(SERVICE_NAME)
  };

  static contextTypes = {
    i18n: PropTypes.object.isRequired
  };

  componentWillMount() {
    this.context.i18n.register('ExampleInput', translations)
  }

  render() {
    let referenceSearchProps = lodash.extend(
      // copy this properties
      lodash.pick(this.props, ['id', 'name', 'onBlur', 'onFocus', 'onChange', 'multiple', 'disabled', 'readOnly']),
      // add custom properties
      {
        value: this.props.value,
        referenceSearchAction: (searchParams, callback) => {
          let exampleService = new ExampleService(this.props.serviceRegistry(SERVICE_NAME).url);
          return exampleService.getExamples(searchParams).then((response) => {
            return callback(
              {
                count: getTotalCount(response),
                items: response.body
              }
            )
          });
        },
        searchFields: [
          {
            name: 'id',
            label: this.context.i18n.getMessage('ExampleInput.id')
          },
          {
            name: 'name',
            label: this.context.i18n.getMessage('ExampleInput.name')
          }
        ],
        resultFields: [
          {
            name: 'id',
            label: this.context.i18n.getMessage('ExampleInput.id')
          },
          {
            name: 'name',
            label: this.context.i18n.getMessage('ExampleInput.name')
          }
        ],

        title: this.context.i18n.getMessage('ExampleInput.dialogTitle'),
        labelProperty: '_objectLabel',
        valueProperty: 'id'
      }
    );

    let autocompleteProps = {
      labelProperty: referenceSearchProps.labelProperty,
      valueProperty: referenceSearchProps.valueProperty,
      autocompleteAction: (searchTerm, callback) => {
        let exampleService = new ExampleService(this.props.serviceRegistry(SERVICE_NAME).url);
        return exampleService.getExamples({ q: searchTerm }).then((response) => {
          return {
            options: response.body,
            complete: false
          };
        });
      },
      reactSelectSpecificProps: this.props.reactSelectSpecificProps
    };

    return (
      <ReferenceSearchInput {...referenceSearchProps}>
        <ReferenceAutocomplete {...autocompleteProps}/>
      </ReferenceSearchInput>
    );
  }
}