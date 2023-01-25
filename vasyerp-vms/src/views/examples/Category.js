
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
  UncontrolledTooltip
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { useState, useEffect } from "react";
import axios from "axios";

const Category = () => {
  // const [noOfRows, setNoOfRows] = useState(1);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [name, setName] = useState('');
  const [cId, setCId] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [addEditBtn, setAddEditBtn] = useState(false);
  // const url = "http://192.168.175.18:9090/category"
  const [data, setData] = useState({
    categoryId: cId,
    categoryName : name
  })
  
// GET API start
  const [categoryArray, setCategoryArray] = useState([]);
  const fetchData = () => {
    return axios.get("http://localhost:9090/categories")
          .then((response) => setCategoryArray(response.data));
  }
  useEffect(() => {
    fetchData();
  },[])

// POST API start
  const addCategory = async (e) => {
    e.preventDefault()
    //const post = { data: data }
    const dataNew = {
      categoryName : name,
      categoryId : cId
    }
    try {
      // const res = await axios.post(url, post)
      var response = "";
    
      await axios.post("http://localhost:9090/category", dataNew , {
        headers: {
          Accept: '*',
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        }
      },
      ).then((data) => {
        response = data;
        fetchData();
        console.log(response);
      });
    } catch (e) {
      console.log(e);
    }
  }

  // DELET API start

  const deleteCategory = async (id) => {
    try {
      const res = await axios.put(`http://localhost:9090/category/delete/${id}`)
      fetchData();
      console.log('Item successfully deleted.')
    } catch (error) {
      alert(error)
    }
  }
  // UPDATE API start
  const [categoryAddEdit, setCategoryAddEdit] = useState(""); 
  // const showHideEditCategory = async (category) => {
  //   name = category.categoryName
  // };

  const showHideCategoryFormHandler = async(type,status, value, cName, catid) => {
    if (status==="edit") {
      setAddEditBtn(true)
    }else{
      setAddEditBtn(false)
    }
    if (type === "show") {
      setCategoryAddEdit(value);
      setName(cName);
      setCId(catid);
    }
    else {
      setCategoryAddEdit(false)
    }
  };
  const updateCategory = async (e) => {
    e.preventDefault();
    const data={
      categoryName: name,
      categoryId : cId
    }
    var response = "";
    await axios.put(`http://localhost:9090/category/${data.categoryId}`, data,{
      headers: {
        Accept: '*',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
      }
    },
    )
    .then(data => {
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
                <h3 className="mb-0">Category List</h3>
              </CardHeader>
              <div>
              <Table style={{height:'200px'}} className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th >Sr No</th>
                    <th >Category Name</th>
                    <th >Status</th>
                    <th >Total Videos</th>
                    <th  />
                  </tr>
                </thead>
                <tbody>
               {/*   {[...Array(noOfRows)].map((elementInArray, index) => { */}
                {categoryArray.sort((a, b) => a.categoryId > b.categoryId ? 1 : -1).map((category, index) => {
                  console.log(category);
                  return (
                    <tr>
                    <td>
                     {category.categoryId}
                    </td>
                    <td>{category.categoryName}</td>
                    <td>
                      <Badge color="" className="badge-dot mr-4 text-success">
                        <i className="bg-warning" />
                        Live
                      </Badge>
                    </td>
                    <td>
                      5
                    </td>
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
                            type="button"  data-bs-toggle="modal" data-bs-target="#staticBackdrop" 
                            onClick={() => {
                              showHideCategoryFormHandler("show","edit", "Edit Category",category.categoryName, category.categoryId);
                            }}
                          >
                            Edit
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={() => deleteCategory(category.categoryId)}
                          >
                            Delete
                          </DropdownItem>
                          <DropdownItem
                            onClick={(e) => e.preventDefault()}
                          >
                            Disable
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr> 
                    );
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

      {/* Category Pop-up form start */}
        <div className="modal fade"  id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog" >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">{categoryAddEdit}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <form >
                <div className="modal-body">
                  <div className="input-group mb-3">
                    {/* <span className="input-group-text bg-dark text-white" id="inputGroup-sizing-default">Name:</span> */}
                    <input  
                    type="text" 
                    className="form-control ps-2" 
                     value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter category name" 
                    aria-label="Sizing example input" 
                    aria-describedby="inputGroup-sizing-default"/>
                  </div>
                </div>
                <div className="modal-footer">
                  {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                  <button 
                    id="categoryFloatingIcon"
                    type="submit" 
                    data-dismiss="modal"
                    onClick={updateCategory} 
                    className={addEditBtn ? "btn btn-secondary" : "d-none"}>Update</button>
                  <button 
                    id="categoryFloatingIcon"
                    type="submit" 
                    data-dismiss="modal"
                    onClick={addCategory} 
                    className={!addEditBtn ? "btn btn-secondary" : "d-none"}>Add</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div 
          className="addCategory d-flex align-items-center justify-content-center text-light" 
          type="button"  data-bs-toggle="modal" data-bs-target="#staticBackdrop" 
          onClick={() => {
            showHideCategoryFormHandler("show","add", "Add Category","");
          }}
          style={{zIndex:"999",position:"fixed", bottom:"50px", right:"50px", borderRadius:"50%", backgroundColor:"#11cdef", padding:"1rem",width:"50px", height:"50px"}}>
          <i className="fas fa-plus"></i>
        </div>
      </Container>
    </>
  );
};

export default Category;
