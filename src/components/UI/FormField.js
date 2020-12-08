import React from "react";

const FormField = (props) => {
  const showError = (formdata) => {
    let errorMessage = (
      <div className="error_label">
        {formdata.validation && !formdata.valid
          ? formdata.validationMessage
          : null}
      </div>
    );
    return errorMessage;
  };

  const renderTemplate = ({ formdata, id, change }) => {
    let formTemplate = null;

    switch (formdata.element) {
      case "input":
        formTemplate = (
          <div>
            {formdata.showLabel ? (
              <div className="label_inputs">{formdata.config.label}</div>
            ) : null}
            <input
              {...formdata.config}
              value={formdata.value}
              onChange={(event) => change({ event, id })}
            />
            {showError(formdata)}
          </div>
        );
        break;

      case "select":
        formTemplate = (
          <div>
            {formdata.showLabel ? (
              <div className="label_inputs">{formdata.config.label}</div>
            ) : null}
            <select
              value={formdata.value}
              onChange={(event) => change({ event, id })}
            >
              <option value="">Select one</option>
              {formdata.config.options.map((item) => {
                return (
                  <option key={item.key} value={item.key}>
                    {item.value}
                  </option>
                );
              })}
            </select>
            {showError(formdata)}
          </div>
        );
        break;
      default:
        formTemplate = null;
    }

    return formTemplate;
  };

  return <div>{renderTemplate(props)}</div>;
};

export default FormField;
