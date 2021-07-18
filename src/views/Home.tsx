import * as React from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { Customer } from "../components/Customer/Customer";
import { AddCustomerForm } from "../components/AddCustomer/AddCustomerForm";
import { SearchCustomer } from "../components/SearchCustomer/SearchCustomer";
import { Dispatch } from "redux";
import { CustomerState, ICustomer } from "../types/types";
import { addCustomer, removeCustomer } from "../redux/actions/customerActions";
import { filteredLaunches } from "../validation/SearchCustomer";
import { StyledCustomerTable, StyledTableContainer } from "../StyledApp";
import { useSortableData } from "../validation/FilterCustomer";

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

  const { items, requestSort, sortConfig } = useSortableData(newCustomer, null);
  const getClassNamesFor = (name: string) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

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

  let sortFilter = items ? items : newCustomer

  return (
    <>
      <AddCustomerForm customers={newCustomer} saveCustomer={saveCustomer} />
      <SearchCustomer
        update={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
        value={searchValue}
      />
      <StyledTableContainer>
        <StyledCustomerTable>
          <thead>
            <tr>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("firstName")}
                  className={getClassNamesFor("firstName")}
                >
                  First Name
                </button>
              </th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("lastName")}
                  className={getClassNamesFor("lastName")}
                >
                  Last Name
                </button>
              </th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("phoneNumber")}
                  className={getClassNamesFor("phoneNumber")}
                >
                  Phone Number
                </button>
              </th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("dateOfBirth")}
                  className={getClassNamesFor("dateOfBirth")}
                >
                  Date of Birth
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortFilter.map((customer: ICustomer) => (
              <Customer
                key={customer.id}
                customer={customer}
                removeCustomer={removeCustomer}
              />
            ))}
          </tbody>
        </StyledCustomerTable>
      </StyledTableContainer>
    </>
  );
};

export default Home;
