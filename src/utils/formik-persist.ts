import { FormikProps, connect, FormikState } from 'formik';
import debounce from 'lodash.debounce';
import * as React from 'react';
import isEqual from 'react-fast-compare';

import { AddEbikeValues } from 'src/modules/hangar/types/hangar';
import { useStore } from 'src/store/useStore';

import { getSelectedCategoryTreeInfo } from './common-functions';

export interface PersistProps {
  name: string;
  debounce?: number;
  isSessionStorage?: boolean;
}

//TODO: Make this component generic
class PersistImpl extends React.Component<
  PersistProps & { formik: FormikProps<AddEbikeValues> },
  {}
> {
  static defaultProps = {
    debounce: 300,
  };

  saveForm = debounce((data: FormikProps<AddEbikeValues>) => {
    const { isSubmitting, ...filteredData } = data; //ommit isSubmitting - submit button depends on this formik prop, it is going to remain disabled
    if (this.props.isSessionStorage) {
      window.sessionStorage.setItem(this.props.name, JSON.stringify(filteredData));
    } else {
      window.localStorage.setItem(this.props.name, JSON.stringify(filteredData));
    }
  }, this.props.debounce);

  componentDidUpdate(prevProps: PersistProps & { formik: FormikProps<AddEbikeValues> }) {
    if (!isEqual(prevProps.formik, this.props.formik)) {
      this.saveForm(this.props.formik);
    }
  }

  componentDidMount() {
    const maybeState = this.props.isSessionStorage
      ? window.sessionStorage.getItem(this.props.name)
      : window.localStorage.getItem(this.props.name);
    if (maybeState && maybeState !== null) {
      const restoredFormikState = JSON.parse(maybeState) as FormikState<AddEbikeValues>;
      //FIXME: If saved category is eg ebike and user will click on other eg on monsterebike
      //level 0 will be monster ebike but rest of levels will be loaded as saved for ebike
      this.props.formik.setFormikState(restoredFormikState);
      useStore
        .getState()
        .setAddVehicleCategory(
          getSelectedCategoryTreeInfo(
            useStore.getState().vehiclesCategories,
            restoredFormikState?.values?.category
          )?.categoriesIndexes ?? [0]
        );
    }
  }

  render() {
    return null;
  }
}

export const Persist = connect<PersistProps, AddEbikeValues>(PersistImpl);
