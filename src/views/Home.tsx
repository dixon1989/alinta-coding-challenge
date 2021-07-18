import * as React from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { Customer } from "../components/Customer/Customer";
import { AddCustomerForm } from "../components/AddCustomer/AddCustomerForm";
import { SearchCustomer } from "../components/SearchCustomer/SearchCustomer";
import { Dispatch } from "redux";
import { CustomerState, ICustomer } from "../types/types";
import { addCustomer, removeCustomer } from "../redux/actions/customerActions";
import { filteredLaunches } from "../validation/SearchCustomer";

const Home: React.FC = () => {
  const customers: ICustomer[] = useSelector(
    (state: CustomerState) => state.customers,
    shallowEqual
  );

  const dispatch: Dispatch<any> = useDispatch();

  const saveCustomer = React.useCallback(
    (customer: ICustomer) => dispatch(addCustomer(customer)),
    [dispatch]
  );

  const [searchValue, setSearchValue] = React.useState<string>("");
  const [newCustomer, setNewCustomer] = React.useState<ICustomer[]>(customers);

  React.useEffect(() => {
    setNewCustomer(customers);
  }, [customers]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Get event value
    let searchValue = event.target.value;
    // Set the state to trigger a re-rendering
    setSearchValue(searchValue);
    let searchFilter = filteredLaunches(customers, searchValue, [
      "firstName",
      "lastName",
      "phoneNumber",
    ]);

    setNewCustomer(searchFilter);
  };

  return (
    <>
      <AddCustomerForm customers={newCustomer} saveCustomer={saveCustomer} />
      <SearchCustomer
        update={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
        value={searchValue}
      />
      {newCustomer.map((customer: ICustomer) => (
        <Customer
          key={customer.id}
          customer={customer}
          removeCustomer={removeCustomer}
        />
      ))}
    </>
  );
};

export default Home;
