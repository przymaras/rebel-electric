import * as React from "react";
import { FormikProps, connect } from "formik";
import debounce from "lodash.debounce";
import isEqual from "react-fast-compare";
import { useHangarStore } from "../store/useHangarStore";

export interface PersistProps {
  name: string;
  debounce?: number;
  isSessionStorage?: boolean;
}

class PersistImpl extends React.Component<
  PersistProps & { formik: FormikProps<any> },
  {}
> {
  static defaultProps = {
    debounce: 300,
  };

  saveForm = debounce((data: FormikProps<{}>) => {
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

  componentDidUpdate(prevProps: PersistProps & { formik: FormikProps<any> }) {
    if (!isEqual(prevProps.formik, this.props.formik)) {
      this.saveForm(this.props.formik);
    }
  }

  componentDidMount() {
    const maybeState = this.props.isSessionStorage
      ? window.sessionStorage.getItem(this.props.name)
      : window.localStorage.getItem(this.props.name);
    if (maybeState && maybeState !== null) {
      const restoredFormikState = JSON.parse(maybeState);
      this.props.formik.setFormikState(restoredFormikState);
      useHangarStore
        .getState()
        .setAddVehicleCategory(
          (restoredFormikState?.values?.category as number[]) ?? [-1]
        );
    }
  }

  render() {
    return null;
  }
}

export const Persist = connect<PersistProps, any>(PersistImpl);
