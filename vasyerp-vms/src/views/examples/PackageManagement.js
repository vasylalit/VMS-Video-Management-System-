// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { useEffect, useState } from "react";
import axios from "axios";

const PackageManagement = () => {

  useEffect(()=>{
    window.scrollTo(0,0)
  },[]);

  const [name, setName] = useState('');
  const [pId, setPId] = useState('');
  const [price, setPrice] = useState('');
  const [validity, setValidity] = useState('');
  const [noOfDev, setNoOfDev] = useState('');
  const [addEditBtn, setAddEditBtn] = useState('');

  const [data, setData] = useState({
    packageId : "",
    packageTitle : "",
    packagePrice : "",
    validity : "",
    numberOfDevices : ""
  })

  // Get API Start
  const [packageArray, setPackageArray] = useState([])
  const fetchData = ()=>{
    return axios.get("http://localhost:9090/packages")
          .then((response) => setPackageArray(response.data))
  }
  useEffect(()=>{
    fetchData();
  },[])

  // POST API Start
  const addPackage = async(e)=>{
    e.preventDefault()
    const dataNew = {
      packageId : pId,
      packageTitle : name,
      packagePrice : price,
      validity : validity,
      numberOfDevices : noOfDev
    }
    try{
      var response =""

      await axios.post("http://localhost:9090/package", dataNew, {
        headers : {
          Accept : '*',
          'Content-Type' : 'Application/json',
          "Access-Control-Allow-Origin" : "*",
          "Access-Control-Allow-Methods" : "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        }
      },
      ).then((data)=>{
        response=data
        fetchData()
        console.log(response);
      })
    }catch(e){
      console.log(e)
    }
  }

  // Delete API Start
  const deletePackage = async(id)=>{
    try{
      const res = await axios.put(`http://localhost:9090/package/delete/${id}`)
      fetchData();
      console.log('Item successfully deleted');
    }catch(error){
      alert(error)
    }
  }

  // Update API Start
  const [packageAddEdit, setPackageAddEdit] = useState("")

  const showHidePackageFormHandler = async(type, status, value, pName, pacid)=>{
    if(status === "edit"){
      setAddEditBtn(true)
    }else{
      setAddEditBtn(false)
    }
    if(type === "show"){
      setPackageAddEdit(value);
      setName(pName);
      setPId(pacid);
    }
    else{
      setPackageAddEdit(false)
    }
  };
  const updatePackage = async(e)=>{
    e.preventDefault();
    const data = {
      packageTitle : name,
      packageId : pId
    }
    var response = "";
    await axios.put(`http://localhost:9090/package/${data.packageId}`, data, {
      headers:{
        Accept: '*',
        'Content-Type' : 'Application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods" : "GET,PUT,POST,DELETE,PATCH,OPTIONS"
      }
    },
    )
    .then(data=>{
      response = data;
      fetchData();
      console.log(response);
    })
  }

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Package List</h3>
              </CardHeader>
              <div>
                <Table
                  style={{ height: "200px" }} className="align-items-center table-flush" responsive>

                  <thead className="thead-light">
                    <tr>
                      <th>ID</th>
                      <th>Package Title</th>
                      <th>Price</th>
                      <th>Duration (In Days)</th>
                      <th>Available Devices</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                  {packageArray.sort((a,b)=> a.packageId>b.packageId ? 1 : -1).map((pack, index) => {
                    console.log(pack);
                    return(
                    <tr>
                    <td>{pack.packageId}</td>
                      <td>{pack.packageTitle}</td>
                      <td>{pack.packagePrice}</td>
                      <td>{pack.validity}</td>
                      <td>{pack.numberOfDevices}</td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={(e) => e.preventDefault()}
                            >

                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                            href="#pablo"
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                            onClick={() => {
                              showHidePackageFormHandler("show","edit", "Edit Package",pack.packageTitle, pack.packageId);
                            }}
                            >
                            Edit
                            </DropdownItem>
                            <DropdownItem
                            href="#pablo"
                            onClick={() => deletePackage(pack.packageId)}
                            >
                            Delete
                            </DropdownItem>
                            <DropdownItem onClick={(e) => e.preventDefault()}>
                            Disable
                            </DropdownItem>
                            </DropdownMenu>
                            </UncontrolledDropdown>
                            </td>
                            </tr>
                    )
                    })}
                  </tbody>
                </Table>
              </div>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>

        {/* Package Pop-up form start */}
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">Add Package</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

              </div>
              <form>
                <div className="modal-body">
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control ps-2"
                      value = {name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter package name"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default"/>
                  </div>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control ps-2"
                      value = {price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="Enter Package Price"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default"/>
                  </div>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control ps-2"
                      value = {validity}
                      onChange={(e) => setValidity(e.target.value)}
                      placeholder="Enter Package Validity (In Days)"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default"/>
                  </div>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control ps-2"
                      value = {noOfDev}
                      onChange={(e) => setNoOfDev(e.target.value)}
                      placeholder="Enter Number of Devices"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default"/>
                  </div>
                </div>
                <div className="modal-footer">
                  {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                  
                  <button 
                    id="packageFloatingIcon"
                    type="submit" 
                    data-dismiss="modal"
                    onClick={addPackage} 
                    className="btn btn-secondary">Add</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div
          className="addCategory d-flex align-items-center justify-content-center text-light"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          style={{
            zIndex: "999",
            position: "fixed",
            bottom: "50px",
            right: "50px",
            borderRadius: "50%",
            backgroundColor: "#11cdef",
            padding: "1rem",
            width: "50px",
            height: "50px",
          }}
        >
          <i className="fas fa-plus"></i>
        </div>
      </Container>
    </>
  );
};

export default PackageManagement;