
import Swal from "sweetalert2";  

const Alert= {  
    warning:async function(){  
        return Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            return result;
           })
    },

    confirmation: async function (title,msg,icon,conbtext) {
        return Swal.fire({
            title: title,
            text: msg,
            icon: icon,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: conbtext
        }).then((result) => {
            return result;
        })
    },

    confirmation_2: async function (title, msg, conbtext,denybtext) {
        return Swal.fire({
            title: title,
            text: msg,
            icon: 'warning',
            showCancelButton: true,
            showDenyButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            denyButtonText: denybtext,
            confirmButtonText: conbtext,
            customClass: {
                denyButton: 'mentor-bench-remove-confirm',
            }
        }).then((result) => {
            return result;
        })
    },

    warningInfo: async function (title, msg, icon = 'warning', iconColor ='#FF4339') {
        return Swal.fire({
            title: title,
            icon: icon,
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok',
            html: msg,
            iconColor: iconColor,
            showCloseButton: true,
        }).then((result) => {
            return result;
        })
    },

    showInfoOnly: async function (title, msg, icon = 'warning', iconColor = '#FF4339') {
        return Swal.fire({
            title: title,
            icon: icon,
            html: msg,
            iconColor: iconColor,
            showCloseButton: true,
            showCancelButton: false,
            showConfirmButton: false,
            customClass: {
                title: 'font-size-24px margintop-minus-70px',
                popup: 'height-470px policy-alert-top',
                htmlContainer:'margintop-minus-90px'
            }
        }).then((result) => {
            return result;
        })
    },

    Success:async function(){
        return Swal.fire(
            'Deleted!',
            'Your Ring Data has been deleted.',
            'success'
        )
    }
    ,  
    _success:function(msg){
      const result = Swal.fire(
        {
          title: msg,
          icon: 'success',
      }
      ); 
      return result;
    },

}
export default Alert;