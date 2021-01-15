import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from 'components/UI/Header/Header';
import Footer from 'components/UI/Footer/Footer';
import { List, ListItem, makeStyles, Divider, Box, FormControl, MenuItem, Select, FormHelperText } from "@material-ui/core";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';
import Pagination from '@material-ui/lab/Pagination';
import MaleAvatar from 'assets/img/maleAvatar.png'
import FemaleAvatar from 'assets/img/femaleAvatar.png'
   
const useStyles = makeStyles(theme => ({
        root: {
          width: "100%",
          backgroundColor: theme.palette.background.paper
        },
        item: {
          padding: theme.spacing(1.2)
        },
        paginator: {
          justifyContent: "center",
          padding: "5px"
        }
      }));
    
const LandingPage = () => {
    const [profileDisplay, setProfileDisplay] = useState([])
    const [allProfiles, setAllProfiles] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    const [isError, setIsError] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const [noOfPages, setNoOfPages] = React.useState(1)
    const [globalGender, setGlobalGender] = useState('');
    const [filterGender, setFilterGender] = useState('');
    const [globalMethod, setGlobalMethod] = useState("");
    const [filterMethod, setFilterMethod] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [searchHint, setSearchHint] = useState("");

    var genderCopy = [];
    var pmCopy = [];
    useEffect(() => {
      fetchProfiles();
    }, []);
      
    const fetchProfiles = async() => {
      try{
        const result = await axios.get('http://api.enye.tech/v1/challenge/records')
        let allData = result.data
        allData = allData.records.profiles
        console.log(allData)
        setAllProfiles(allData)
        setProfileDisplay(allData)
        setNoOfPages(Math.ceil(allData.length / itemsPerPage))
        setFilterGender(allData)
        setFilterMethod(allData)
        setIsLoading(false);
        setIsError(false)
      } catch (e){
          setErrorMessage('Error while getting data, check your network connectivity and try again')
          setIsLoading(false)
      }
    }


    const searchList= (e) =>{ 
      setSearchInput(e.target.value)
      let searchString = e.target.value.toLowerCase();
      let newData = filterMethod.filter(function (item) {
        if ((item.FirstName.toLowerCase().includes(searchString)) || (item.LastName.toLowerCase().includes(searchString)) || (item.UserName.toLowerCase().includes(searchString))){
          return item
        }

      });
      setProfileDisplay(newData);
      setNoOfPages(Math.ceil(newData.length / itemsPerPage))
      if (searchInput !== ""){
        setSearchHint(`${newData.length} search result(s)`)
      }
    }
        
    const classes = useStyles();
    
    const itemsPerPage = 20;
    const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
      setPage(value);
    };
      
    const handleGenderChange = (event) => {
      setGlobalMethod("");
      setSearchInput("")
      setGlobalGender(event.target.value);
      let newGender = event.target.value
      if (newGender == "All Gender"){
        setProfileDisplay(allProfiles)
        setFilterGender(allProfiles)
        setFilterMethod(allProfiles)
        setNoOfPages(Math.ceil(allProfiles.length / itemsPerPage))
      }else {
        let new_items = [];
        new_items = allProfiles.filter(item =>
          item.Gender == newGender
        );
        setProfileDisplay(new_items);
        setNoOfPages(Math.ceil(new_items.length / itemsPerPage))
        setFilterGender(new_items)
        setFilterMethod(new_items)
      }
    }

    const handlePaymentChange = (event) => {
      setSearchInput("")
      setGlobalMethod(event.target.value);
      let newMethod = event.target.value
      if (newMethod == "All Method"){
        setProfileDisplay(filterGender)
        setNoOfPages(Math.ceil(filterGender.length / itemsPerPage))
        setFilterMethod(filterGender)
      }else {
        let new_items = [];
        new_items = filterGender.filter(item =>
          item.PaymentMethod == newMethod
        );
        setProfileDisplay(new_items);
        setNoOfPages(Math.ceil(new_items.length / itemsPerPage))
        setFilterMethod(new_items)
      }
    }

    return (
        <div>
          <Header />
            <br/>
              <div class="page-container row">
                <div className="col-12 col-md-2 filters">
                  <List>
                    <ListItem className={classes.listItem}>
                    <FormControl variant='outlined' style={{width:'170px'}}>
                      <Select
                        value={globalGender}
                        onChange={handleGenderChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                      >
                        <MenuItem value="" disabled style={{fontSize:'15px'}}>
                          Filter Gender
                        </MenuItem>
                        <MenuItem value="All Gender" style={{fontSize:'14px'}}>
                          --All Gender--
                        </MenuItem>
                        {allProfiles &&
                          allProfiles.map((displayItems, index) =>{
                            if (!genderCopy.includes(displayItems.Gender)){
                              genderCopy.push(displayItems.Gender)
                            return <MenuItem style={{fontSize:'13px'}} value={displayItems.Gender}>{displayItems.Gender}</MenuItem>
                            }
                          })
                        }
                        </Select>
                      <FormHelperText>Filter Gender</FormHelperText>
                    </FormControl>
                    </ListItem>
                    <ListItem className={classes.listItem}>
                    <FormControl variant='outlined' style={{width:'170px'}}>
                      <Select
                        value={globalMethod}
                        onChange={handlePaymentChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                      >
                        <MenuItem value="" disabled style={{fontSize:'14px'}}>
                          Payment Method
                        </MenuItem>
                        <MenuItem value="All Method" style={{fontSize:'14px'}}>
                          --All Method--
                        </MenuItem>
                        {allProfiles &&
                          allProfiles.map((displayItems, index) =>{
                            if (!pmCopy.includes(displayItems.PaymentMethod)){
                              pmCopy.push(displayItems.PaymentMethod)
                            return <MenuItem style={{fontSize:'13px'}} value={displayItems.PaymentMethod}>{displayItems.PaymentMethod}</MenuItem>
                            }
                          })
                        }
                        </Select>
                      <FormHelperText>Filter Payment Method</FormHelperText>
                    </FormControl>
                    </ListItem>
                  </List>
                </div>
                  <div class="col-12 col-md-10 listing">
                    <h3 align="center">PROFILES</h3>
                    {isLoading ? (<p align="center">Data loading, please wait.. 
                            <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
                            </p>
                          ) : (
                          <div>
                            <div className="article-search" id="list-search">
                              <input
                                  type="text"
                                  id="article-searcher"
                                  className="searchbox"
                                  placeholder="Search profiles with Name or Username"
                                  onChange={searchList}
                                  value={searchInput}
                              />
                            </div>
                            {searchInput == "" ? (
                              <p></p>
                            ) : (
                              <p align="center" id="searchCount">{searchHint}</p>
                            )}
                            <List dense component="span" id="profileList">
                              {profileDisplay && profileDisplay
                                .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                                .map(jobItem => {
                                  const labelId = `list-secondary-label-${jobItem.LastName}`;
                                   return (
                                    <div class="card user-card"
                                      key={jobItem.id}
                                    >
                                      <div class="card-body">
                                        <div class="user-image">
                                          {jobItem.Gender == "Male"? (
                                            <img src={MaleAvatar} class="img-radius" alt="User-Profile-Image" />
                                          ) : (
                                            <img src={FemaleAvatar} class="img-radius" alt="User-Profile-Image" />
                                          )}
                                        </div>
                                        <h6 class="f-w-600 m-t-25 m-b-10">{jobItem.FirstName} {jobItem.LastName}({jobItem.UserName})</h6>
                                        <p class="text-muted">Gender: {jobItem.Gender}</p>
                                        <p > <i class="fa fa-map-marker-alt"></i> {jobItem.Latitude}, {jobItem.Longitude}</p>                       
                                        <p> <i class="fa fa-mobile-alt"></i> {jobItem.PhoneNumber} | <i class="fa fa-envelope-square"></i> {jobItem.Email} </p>
                                        <p> <i class="fa fa-globe"></i> {jobItem.URL} </p>
                                        <ul class="list-group" align="left" style={{width:"340px", margin: "0px", border:"1px solid"}}>
                                          <li class="list-group-item list-group-item-primary"> Credit Card Number: {jobItem.CreditCardNumber}</li>
                                          <li class="list-group-item list-group-item-primary"> Credit Card Type: {jobItem.CreditCardType}</li>
                                          <li class="list-group-item list-group-item-primary"> Mac Address: {jobItem.MacAddress}</li>
                                          <li class="list-group-item list-group-item-primary">Domain Name: {jobItem.DomainName}</li>
                                          <li class="list-group-item list-group-item-primary">Last Login: {jobItem.LastLogin}</li>
                                          <li class="list-group-item list-group-item-primary">Payment Method: {jobItem.PaymentMethod}</li>
                                        </ul>            
                                      </div>
                                    </div>
                                  );
                                })}
                            </List>
                            <br />
                            <Divider />
                            <Box component="span">
                              <Pagination
                                count={noOfPages}
                                page={page}
                                onChange={handleChange}
                                defaultPage={1}
                                color="primary"
                                size="large"
                                showFirstButton
                                showLastButton
                                classes={{ ul: classes.paginator }}
                              />
                            </Box>
                          </div>
                          )}
                  </div>
                </div>
                <br/>
            <Footer />
          </div>
        );
      };
      
export default LandingPage
