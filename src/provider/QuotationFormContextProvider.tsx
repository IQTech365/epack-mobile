import React, {
  ReactElement,
  createContext,
  useCallback,
  useContext,
  useReducer,
} from 'react';
import {
  quotationReducer,
  initialState,
  ACTION,
} from '../views/quotation/addQuotation/quotationReducer2';

const useQuotationFormContext = () => {
  const [state, dispatch] = useReducer(quotationReducer, initialState);

  const setShiftingType = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.SHIFTING_TYPE,
        payload: text,
      });
    },
    [state.shifting_type],
  );

  return {
    state,
    setShiftingType,
  };
};

type UseQuotationFormContextType = ReturnType<typeof useQuotationFormContext>;

const initQuotationFormContextState: UseQuotationFormContextType = {
  state: initialState,
  setShiftingType: (text: string) => {},
};

const QuotationFormContext = createContext<UseQuotationFormContextType>(
  initQuotationFormContextState,
);

const useQuotationFormContextHook = () => useContext(QuotationFormContext);

const QuotationFormContextProvider: React.FC<{children: ReactElement}> = ({
  children,
}) => {
  return (
    <QuotationFormContext.Provider value={useQuotationFormContext()}>
      {children}
    </QuotationFormContext.Provider>
  );
};

export {useQuotationFormContextHook, QuotationFormContextProvider};
