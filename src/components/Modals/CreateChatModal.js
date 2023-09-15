import React, { useEffect, useState,forwardRef, useRef, useImperativeHandle} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import Service from '../../Service/Service';
import modalActions from '../../redux/actions/modal';
import Alert from '../../AlertService/Alert';
let query = window.location.pathname.split('/');
const CreatChatmodal = forwardRef((props, ref) => {
  const dispatch=useDispatch(); 
  const[inputField,setInputfield]=useState({name:'',file:''});
  const[searchName,setsearchName]=useState();

  const modal_name=useSelector(state=>state.modal.modal_name);
  const [selectedFile, setSelectedFile] = useState('');
  const [profileselectedFile, setProfileSelectedFile] = useState('');
  const [ringMember,setRingMember]=useState([]);
  const [selectedMember,setSelectedMember]=useState([]);
  const [ids,setIds]=useState([]);
  const [groupby,setGroupby]=useState();
  useImperativeHandle(
    ref,
    () => ({
      refreshList(){
        setSelectedMember([]);
        sortbyLetter([]);
        setRingMember([]);
        setsearchName('');
        Service.GetMembersByRingID(query[2]).then((response) => {
          FetchRingMemberData(response)
      }).catch(function (error) {
          alert(JSON.stringify(error));
      });
       },
    }),
)

const inputsHandler = (e) => {
    setInputfield({
      ...inputField,
      [e.target.name]:  e.target.value
    });
  };

  const handleChange=(e)=> {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      var filename=e.target.files[0].name.split(".");
      var extenssion=filename[1];
      setInputfield({
        ...inputField,
        file:  e.target.files[0]
      });
      var File_newName=generate_uuidv4()+'.'+extenssion;
      var file = e.target.files[0];
      var blob = file.slice(0, file.size, 'image/png'); 
      var newFile = new File([blob], File_newName, {type: 'image/png'});
      setProfileSelectedFile(newFile)
      setSelectedFile(URL.createObjectURL(newFile));
    }
  }

  const generate_uuidv4=()=> {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
    function(c) {
       var uuid = Math.random() * 16 | 0, v = c === 'x' ? uuid : (uuid & 0x3 | 0x8);
       return uuid.toString(16);
    });
  }

  const closeModal=()=>{
    dispatch(modalActions.toggleModal(''));
  }
  
  const createChat=()=>{
    const User = JSON.parse(localStorage.getItem("login_data"));
  //  props.eventmodal();
    Service.uploadFile(profileselectedFile).then((res)=>{
      var param={
        "ringChatId": generate_uuidv4(),
        "ringId": query[2],
        "name": inputField.name,
        "photoId":res?profileselectedFile.name:'',
        "ownerId": User.id,
        "chatMemberRoleTypeId": 1
    }
      Service.CreateChat(param).then((response)=>{
        if(!res){alert('Group chat image not uploaded')}
        SendChatrequest(response?.data)
     }).catch((err)=>{

     })
    }).catch((err)=>{

    })
  }
 
  const SendChatrequest=(data)=>{
    let Ids = selectedMember.map((obj) =>obj.ringRequestedId);
    var param={
        "ringChatRequestId": generate_uuidv4(),
        "ringId": query[2],
        "ringChatId":data.ringChatId,
        "userIdList": ["E9F8D3A0-5594-486E-9919-2C4932BFC185","E64EC8B4-9CFF-47C2-B408-EA523EB6DE74","0F1AD8AA-44DF-444B-92C2-925AAC1B1BDF"],
        "status": 1,
        "roleId": 1
      }
    Service.SendChatReq(param).then((res)=>{
      var nbn='New chat group '+ inputField.name + ' created.';
      Alert._success(nbn);
     }).catch((err)=>{
     })
     }
    
  
    

   useEffect(()=>{
   },[])

   const FetchRingMemberData=(response)=> {
    response = response ? response : [];
    let tempData = [];
    let promises = [];
    response.map((result, index) => {
        result.isSelected = false;
        result.roleId = result.roleId ? "" + result.roleId : result.roleId;
        if (result.photoId) {
            promises.push(Service.GetIMAGEURI(result.photoId).then((res => {
                result.photoId = res.data;
                tempData.push(result);
            })));
        }
        else {
            tempData.push(result);
        }
    });

    Promise.all(promises).then(() => {
        console.log(tempData)
        setRingMember(tempData);
        sortbyLetter(tempData);
    });
   }

   
   const sortbyLetter=(arr)=>{
    let data = arr.reduce((r, e) => {
      // get first letter of name of current element
      let group = (e.firstName[0]).toUpperCase();
      // if there is no property in accumulator with this letter create it
      if(!r[group]) r[group] = {group, children: [e]}
      // if there is push current element to children array for that letter
      else r[group].children.push(e);
      // return accumulator
      return r;
    }, {})
    
    // since data at this point is an object, to get array of values
    // we use Object.values method
    let result = Object.values(data)
    setGroupby(result);
    console.log(result)
   }


   const SelecteMember=(data,action)=>{
     const newList=ringMember.map((item)=>
     {
        if(item.id===data.id){ //emailId
        const update={
            ...item,
            isSelected:action==='select'?true:false
        }
            return update
        }
       return item;
     })
     const sm=newList.filter((el)=>el.isSelected===true)
     setSelectedMember(sm)
     sortbyLetter(newList)
     setRingMember(newList);
   }

   const searchUser=(search_name)=>{
    if(search_name){ 
      var bb=ringMember.filter((el)=> el.firstName.toUpperCase()===search_name.toUpperCase())
      if(bb.length>0){ sortbyLetter(bb)}
    }
    else{
      sortbyLetter(ringMember)
    }
   }

  return (
    <>
    <Modal show={modal_name==='CreatChat'}   dialogClassName="availabilityModal">
      <Modal.Header closeButton  onClick={closeModal}>
        <Modal.Title className='offset-5'>
            <div className='row'>New Chat</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='row '>
            <form id="form-file-upload "  onSubmit={(e) => e.preventDefault()}>
             <div className="form-group offset-3">
                  <input
                    type="text"
                    name="name"
                    value={inputField.name || ''}
                    onChange={(value) => inputsHandler(value)}
                    className="form-control "
                    placeholder='Enter Chat Name'
                    style={{width:'50%',border:'none',marginLeft:'10px'}}
                  />
              </div>
              <div className='row  offset-4'>
                <input type="file" id="input-file-upload"  onChange={handleChange} />
                <label id="label-file-upload" htmlFor="input-file-upload" >
                  {
                      selectedFile?
                      <img src={selectedFile} style={{width:'100px',borderRadius:'50%'}} alt=""/>
                      :
                      <img src="./img/svg/create_chat.svg" alt="3-dots"/>
                  }
                </label>
              </div>
            </form>
        </div>
        <div className='row offset-4 mb-3'>Add group Photo</div>
        <div class="input-group">
            <input
             class="form-control search_input p-2"
              type="text"
              name="name"
              value={searchName || ''}
              onChange={(e) => setsearchName(e.target.value)}
              placeholder='Search...'
            />
            <div class="input-group-append" onClick={()=>searchUser(searchName)}>
                <span class="input-group-text search_svg">
                  <img src="./img/svg/search.svg" alt="3-dots"/>
                </span>
            </div>
        </div>
            <div className='row mb-3 mt-3'>
           
            {
            selectedMember?.length > 0 && selectedMember?.map((intr)=>{
                return(
                <div key={intr.id} className="col-2" > 
                  <div className='row img-download'>
                  <img 
                    src={intr.photoId} className='rounded-circle' alt='' style={{ height:'50px'}}
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null; 
                        currentTarget.src="./img/svg/chat_memebr.svg";
                    }}/>
                     <i onClick={()=>SelecteMember(intr,'unselect')}><img src="./img/svg/cancel_24px.svg" alt="3-dots"/></i>
                  </div>
                  <div className={`row `} key={intr.id}>{intr.firstName}</div> 
                </div>
                )
            })
            } 

           {
             groupby?.map(dataIn => {
              return (
                <div key={dataIn.group}>
                  {dataIn.group}
                    {dataIn.children.map(el => (
                      <div key={el.id}  onClick={()=>SelecteMember(el,'select')}
                         className={`${el.isSelected?"active_chatmembr":''}  d-flex justify-content-between align-items-start `} >
                       <img 
                        src={el.photoId} className='rounded-circle' alt='' style={{width:'50px', height:'50px'}}
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null; 
                          currentTarget.src="./img/svg/chat_memebr.svg";
                        }}/>
                        <div className="me-auto ms-2">
                            <p>{el.firstName} </p>
                            <p>1234567890 </p>
                        </div>
                      </div>
                    
                    ))}
                </div>
              );
            })
           }
            </div>
          <div>
          </div>
      </Modal.Body>
      <Modal.Footer >
           <button type="button" className="btn btn-app py-2" onClick={createChat}>Save </button>
     </Modal.Footer>
    </Modal> 
    </>
    
    )})

export default CreatChatmodal;
