import * as React from "react";
import { FormikProps, connect } from "formik";
import debounce from "lodash.debounce";
import isEqual from "react-fast-compare";

class PersistImpl extends React.Component {
  static defaultProps = {
    debounce: 300,
  };

  saveForm = debounce((data) => {
    const { isSubmitting, ...filteredData } = data; //ommit isSubmitting - submit button depends on this formik prop, it is going to remain disabled
    if (this.props.isSessionStorage) {
      window.sessionStorage.setItem(
        this.props.name,
        JSON.stringify(filteredData)
      );
    } else {
      window.localStorage.setItem(
        this.props.name,
        JSON.stringify(filteredData)
      );
    }
  }, this.props.debounce);

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.formik, this.props.formik)) {
      this.saveForm(this.props.formik);
    }
  }

  componentDidMount() {
    const maybeState = this.props.isSessionStorage
      ? window.sessionStorage.getItem(this.props.name)
      : window.localStorage.getItem(this.props.name);
    if (maybeState && maybeState !== null) {
      this.props.formik.setFormikState(JSON.parse(maybeState));
    }
  }

  render() {
    return null;
  }
}

export const Persist = connect(PersistImpl);
