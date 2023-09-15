import React, { Component } from 'react'
import { NavItem, NavLink } from 'reactstrap'
import { Link } from 'react-router-dom'
import Service from '../../../Service/Service'
import { ManageSettings } from './AddMangetabs/ManageSettings/Settings'
import RingMembers from './AddMangetabs/ManageSettings/RingMembers'
import Slider from '@material-ui/core/Slider'
import { debounce } from 'lodash'
import Member from '../Member/Member'
import GroupMember from '../Member/GroupMember'
import AlertService from '../../../AlertService/Alert'
import Papa from 'papaparse'
import Loader from '../../Layout/Loader'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import Dropdown from '../../../Service/Dropdown'
import Swal from 'sweetalert2'
import UserTooltip from './UserTooltip'
import OverflowTip from '../../Layout/OverflowTip'
import Tooltip from '../../Layout/Tooltip'
import { ExportReactCSV } from './ExportReactCSV'

export class RingManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ringMembers: [],
      filterRingMembers: [],
      searchedMembers: [],
      activeId: '1',
      showSetting: true,
      showMembers: false,
      showmatching: false,
      ringid: '',
      ringname: '',
      description: '',
      ispublic: true,
      isprivate: false,
      range: [4, 10],
      interest: [],
      values: [],
      showMember: false,
      memberPopupHeader: '',
      memberPopupContent: null,
      showgroupMember: false,
      groupmemberPopupHeader: '',
      photoId: '',
      ringImage: '',
      imagedata: 'img/profile.svg',
      status: true,
      organizationdata: [],
      organizationgroupdata: [],
      showdropdown: false,
      options: [],
      existMembers: [],
      serachvalue: '',
      isNameSortAsc: true,
      isEmailSortAsc: true,
      isTitleSortAsc: true,
      isLocationSortAsc: true,
      isRoleSortAsc: true,
      isRequestSortAsc: true,
      isRequestExist: false,
      beforeSelectedCol: null,
      selectedCol: null,
      groupuserdata: [],
      groupmemberdata: [],
      rolememberId: '',
      filedata: '',
      showsearch: false,
      isLoading: false,
      isShowPaging: false,
      showTooltip: false,
      ringRoles: [
        {
          id: '1',
          name: 'Mentee',
        },
        {
          id: '2',
          name: 'Mentor',
        },
        {
          id: '3',
          name: 'Admin',
        },
      ],
    }

    this.rangeSelector = this.rangeSelector.bind(this)
    this.getMatchingCriteria = this.getMatchingCriteria.bind(this)
    this.clickListener = this.clickListener.bind(this)
  }

  componentDidMount() {
    var self = this
    const data = JSON.parse(localStorage.getItem('login_data'))
    let query = window.location.pathname.split('/')
    self.setState(
      {
        userid: data.id,
        AccessToken: data.token,
        ringid: query && query.length == 3 ? query[2] : '',
      },
      () => {
        self.GetRingDetail()
      }
    )
  }

  async GetRingDetail() {
    if (window.location.pathname) {
      //-----------Existing Ring Get------------//
      if (this.state.ringid) {
        Service.GetRingSettingsByRingId(
          this.state.AccessToken,
          this.state.ringid
        )
          .then((response) => {
            if (response) {
              this.setState({
                ringid: response.id,
                ringname: response.name,
                description: response.description,
                imagedata: response.ringPictureData
                  ? response.ringPictureData
                  : 'img/profile.svg',
                ringtype: '' + response.ringTypeId,
                ringTypeName: response.ringTypeName,
                scopeTypeName: response.scopeTypeName,
                photoId: response.photoId,
                scopetype: '' + response.scopeId,
                status: response.status,
                mentees: response.mentees,
                mentors: response.mentors,
                beforeChangeSettings: {
                  ringname: response.name,
                  description: response.description,
                  ringtype: '' + response.ringTypeId,
                  scopetype: '' + response.scopeId,
                  imagedata:
                    response.photoId && response.ringPictureData
                      ? response.ringPictureData
                      : 'img/profile.svg',
                },
              })
            }
          })
          .catch(function (error) {
            alert(JSON.stringify(error))
          })
      }
      //-----------Existing Ring Get------------//
      else {
        this.setState({
          scopetype: '1',
          ringtype: '1',
        })
      }
    }

    if (localStorage.getItem('LogInType') === '0') {
      this.setState({ showsearch: true }, () => {
        this.GetOrganizationUser()
        //this.GetOrganizationGroup();
      })
    }
  }

  GetOrganizationUser() {
    var self = this
    Service.GetOrganizationUser().then((response) => {
      debugger
      this.setState(
        {
          ...this.state,
          organizationdata: response.value,
        },
        () => {
          let existMembers = [...this.state.existMembers]
          self.state.organizationdata.forEach((element) => {
            existMembers.push({
              key: element.id,
              value: element.id,
              label: element.displayName,
              givenName: element.givenName,
              surName: element.surname,
              mail: element.mail,
              jobTitle: element.jobTitle,
              city: '',
              country: '',
            })
            this.setState({ existMembers })
          })
        }
      )
    })
  }

  GetOrganizationGroup() {
    var self = this
    Service.GetOrganizationGroup().then((response) => {
      this.setState(
        {
          ...this.state,
          organizationgroupdata: response.value,
        },
        () => {
          let options = [...this.state.options]
          self.state.organizationgroupdata.forEach((element) => {
            options.push({
              key: element.id,
              value: element.id,
              label: element.displayName,
              mailNickname: element.mailNickname,
            })
            this.setState({ options })
          })
        }
      )
    })
  }

  getMatchingCriteria(expFrom, expTo) {
    Service.GetMatchingCriteria(expFrom, expTo, this.state.AccessToken)
      .then((response) => {
        var data = response ? response.result : null
        this.state.interest = []
        let UniqueId = 0
        if (Object.entries(data.interest).length > 0) {
          Object.entries(data.interest).map(([key, value]) => {
            UniqueId = UniqueId + 1
            this.state.interest.push({
              id: UniqueId,
              key: key,
              value: value,
              isSelected: false,
            })
          })
        }
        this.state.values = []
        if (Object.entries(data.values).length > 0) {
          UniqueId = 0
          Object.entries(data.values).map(([key, value]) => {
            UniqueId = UniqueId + 1
            this.state.values.push({
              id: UniqueId,
              key: key,
              value: value,
              isSelected: false,
            })
          })
        }
        this.setState({
          interest: this.state.interest,
          values: this.state.values,
        })
      })
      .catch(function (error) {
        alert(JSON.stringify(error))
      })
  }

  Toggletab(IsProject, id) {
    if (id === '1') {
      this.setState({
        showSetting: IsProject,
        showMembers: false,
        showmatching: false,
      })
    } else if (id === '2') {
      this.setState(
        {
          ...this.state,
          selectedMemberItems: [],
          showSetting: false,
          showMembers: IsProject,
          showmatching: false,
        },
        () => {
          debugger
          if (!this.state.isLoadedMember && this.state.ringid) {
            if (
              this.state.ringname != this.state.beforeChangeSettings.ringname ||
              this.state.description !=
                this.state.beforeChangeSettings.description ||
              this.state.ringtype != this.state.beforeChangeSettings.ringtype ||
              this.state.scopetype !=
                this.state.beforeChangeSettings.scopetype ||
              this.state.imagedata != this.state.beforeChangeSettings.imagedata
            ) {
              this.state.isLoadRingMember = true
              this.SaveRing()
            } else {
              this.GetRingMembers()
            }
          } else {
            this.SaveRing()
          }
        }
      )
    } else if (id === '3') {
      this.setState({
        showSetting: false,
        showMembers: false,
        showmatching: IsProject,
      })
      this.getMatchingCriteria(this.state.range[0], this.state.range[1])
    }
    this.setState({ activeId: id })
  }

  GetRingMembers() {
    if (this.state.isShowPaging && window.$('#tblRingMembers').dataTable()) {
      window.$('#tblRingMembers').dataTable().fnDestroy()
    }
    Service.GetRingMembersByRingId(this.state.AccessToken, this.state.ringid)
      .then((response) => {
        debugger
        response = response ? response : []
        this.FetchRingMemberData(response)
      })
      .catch(function (error) {
        alert(JSON.stringify(error))
      })
  }

  FetchRingMemberData(response) {
    response = response ? response : []
    let tempData = []
    let promises = []
    response.map((result, index) => {
      result.isSelected = false
      result.roleId = result.roleId ? '' + result.roleId : result.roleId
      if (result.photoId) {
        promises.push(
          Service.GetImageUri(this.state.AccessToken, result.photoId).then(
            (res) => {
              result.imageurl = res
              tempData.push(result)
            }
          )
        )
      } else {
        tempData.push(result)
      }
    })

    Promise.all(promises).then(() => {
      this.setState(
        {
          filterRingMembers: tempData,
          ringMembers: tempData,
          isRequestExist:
            tempData &&
            tempData.length &&
            tempData.filter((item) => item.requestStatus == 1).length > 0
              ? true
              : false,
          isLoadedMember: true,
          mentees: tempData.filter((item) => item.roleId == 1).length,
          mentors: tempData.filter((item) => item.roleId == 2).length,
        },
        () => {
          if (this.state.ringMembers && this.state.ringMembers.length > 8) {
            this.setPagination()
          }
          this.changeMemberSortOrder(true, true, true, true, true, 1, true)
        }
      )
    })
  }

  setPagination(pagelength = 8) {
    this.setState({
      isShowPaging: true,
    })
    window.$('#tblRingMembers').dataTable({
      pageLength: pagelength,
      bLengthChange: false,
      bFilter: false,
      bInfo: false,
      columnDefs: [
        { orderable: false, targets: 0 },
        { orderable: false, targets: 1 },
        { orderable: false, targets: 2 },
        { orderable: false, targets: 3 },
        { orderable: false, targets: 4 },
        { orderable: false, targets: 5 },
        { orderable: false, targets: 6 },
      ],
    })
  }

  changeMemberSortOrder = (
    isname,
    isEmail,
    isTitle,
    isLocation,
    isRole,
    col,
    isRequest = null
  ) => {
    this.setState(
      {
        selectedCol: col,
        isNameSortAsc: isname,
        isEmailSortAsc: isEmail,
        isTitleSortAsc: isTitle,
        isLocationSortAsc: isLocation,
        isRoleSortAsc: isRole,
        isRequestSortAsc:
          isRequest != null ? isRequest : this.state.isRequestSortAsc,
      },
      () => {
        this.setMemberTableOptions(col)
      }
    )
  }

  setMemberTableOptions = (col = null) => {
    if (col >= 0 && this.state.ringMembers && this.state.ringMembers.length) {
      if (this.state.isShowPaging && window.$('#tblRingMembers').dataTable()) {
        window.$('#tblRingMembers').dataTable().fnDestroy()
      }
      this.setState(
        {
          ringMembers: this.state.ringMembers.sort((a, b) => {
            return col == 1
              ? (this.state.isNameSortAsc &&
                  (a.firstName + ' ' + a.lastName >
                  b.firstName + ' ' + b.lastName
                    ? 1
                    : -1)) ||
                  (!this.state.isNameSortAsc &&
                    (a.firstName + ' ' + a.lastName >
                    b.firstName + ' ' + b.lastName
                      ? -1
                      : 1))
              : col == 2
              ? (this.state.isEmailSortAsc && a.emailAddress > b.emailAddress
                  ? 1
                  : -1) ||
                (!this.state.isEmailSortAsc && a.emailAddress - b.emailAddress
                  ? -1
                  : 1)
              : col == 3
              ? (this.state.isTitleSortAsc && a.designation > b.designation
                  ? 1
                  : -1) ||
                (!this.state.isTitleSortAsc && a.designation > b.designation
                  ? -1
                  : 1)
              : col == 4
              ? (this.state.isLocationSortAsc &&
                  (a.country + ' ' + a.city > b.country + ' ' + b.city
                    ? 1
                    : -1)) ||
                (!this.state.isLocationSortAsc &&
                  (a.country + ' ' + a.city > b.country + ' ' + b.city
                    ? -1
                    : 1))
              : col == 5
              ? (this.state.isRoleSortAsc && a.roleName > b.roleName
                  ? 1
                  : -1) ||
                (!this.state.isRoleSortAsc && a.roleName > b.roleName ? -1 : 1)
              : (this.state.isRequestSortAsc &&
                a.requestStatusName > b.requestStatusName
                  ? 1
                  : -1) ||
                (!this.state.isRequestSortAsc &&
                a.requestStatusName - b.requestStatusName
                  ? -1
                  : 1)
          }),
          beforeSelectedCol: col,
          isShowPaging: false,
        },
        () => {
          if (this.state.ringMembers && this.state.ringMembers.length > 8) {
            this.setPagination()
          }
        }
      )
    }
  }

  SaveRing(isSaveOnly = false) {
    Service.SaveRingSettings(this.state)
      .then((response) => {
        if (response) {
          if (response.status == 500 || response.message == 'RINGEXIST') {
            if (response.message) {
              AlertService.warningInfo(
                'Information',
                response.message == 'RINGEXIST'
                  ? "<span style = 'color:red',fontWeight: 'bold' >Same ring name already exist.</span >"
                  : response.message
              ).then((res) => {
                this.props.onSaveMember(this.state)
              })
            }
          } else {
            if (isSaveOnly) {
              var link = document.getElementById('ringList-link')
              link.click()
            }
            if (this.state.isLoadRingMember) {
              this.FetchRingMemberData(response.result)
            } else if (response.result) {
              this.setState({
                ringid: response.result.id,
                ringTypeName: response.result.ringTypeName,
                scopeTypeName: response.result.scopeTypeName,
                photoId: response.result.photoId,
                mentees: response.result.mentees,
                mentors: response.result.mentors,
                beforeChangeSettings: {
                  ringname: response.result.name,
                  description: response.result.description,
                  ringtype: '' + response.result.ringTypeId,
                  scopetype: '' + response.result.scopeId,
                  imagedata: this.state.imagedata,
                },
              })
            }
            this.setState({
              isLoadRingMember: false,
            })
          }
        }
      })
      .catch(function (error) {
        this.setState({
          isLoadRingMember: false,
        })
        alert(JSON.stringify(error))
      })
  }

  getManageSettingCallback = (childData) => {
    this.setState({
      ringtype: childData.ringtype,
      scopetype: childData.scopetype,
    })
  }

  rangeSelector(event, newValue) {
    this.setState({ range: newValue })
    this.debouncedSearch(this.state.range[0], this.state.range[1])
  }

  debouncedSearch = debounce(function (expFrom, expTo) {
    this.getMatchingCriteria(expFrom, expTo)
  }, 1000)

  selectInterest(obj) {
    this.state.interest
      .filter((f) => f.isSelected == true)
      .map((sobj, sindex) => {
        sobj.isSelected = false
        if (obj.id === sobj.id) {
          sobj.isSelected = true
        }
      })
    this.setState({ interest: this.state.interest })
  }

  showMember = (data, isSelected = false) => {
    alert(0)
    debugger
    this.setState({ searchedMembers: [], serachvalue: '' })
    this.setState({
      memberPopupContent: {
        ringId: this.state.ringid,
        memberId: data.id ? data.id : '',
        firstName: data.givenName ? data.givenName : data.label,
        lastName: data.surName,
        emailAddress: data.mail,
        title: data.jobTitle,
        country: data.country,
        city: data.city,
        roleId: '1',
        userRoleId: '3',
        isOrgUser: true,
        isSelectedUser: isSelected,
        imagedata: data.imageurl,
      },
      showMember: true,
      memberPopupHeader: 'Add Member',
    })
  }

  saveMember = (memberData) => {
    this.GetRingMembers()
    this.closeMember()
    this.closeGroupMember()
  }

  closeMember = (status = false) => {
    this.setState({
      memberPopupHeader: '',
      showMember: status,
      memberPopupContent: null,
    })
  }

  closeGroupMember = (status = false) => {
    this.setState({
      groupmemberdata: [],
      showgroupMember: status,
      groupmemberPopupHeader: '',
    })
  }

  onChangeRingImage = (e) => {
    const file = e.target.files[0]
    this.setState({ ringImage: file })
    let promises = []
    let tempImageData = {
      photoId: null,
      image: null,
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        resolve(event.target.result)
        tempImageData.image = event.target.result
        if (this.state.ringid) {
          promises.push(
            Service.UpdateRingImage(
              this.state.AccessToken,
              this.state.ringid,
              this.state.photoId,
              file
            )
              .then((response) => {
                if (response) {
                  tempImageData.photoId = response.photoId
                }
              })
              .catch(function (error) {
                alert(JSON.stringify(error))
              })
          )
        }
        Promise.all(promises).then(() => {
          if (tempImageData.photoId) {
            this.setState({ photoId: tempImageData.photoId })
          }
          if (tempImageData.image) {
            this.setState({ imagedata: tempImageData.image })
          }
        })
      }
      reader.onerror = (err) => {
        reject(err)
      }
      reader.readAsDataURL(file)
    })
  }

  changeRingImage = () => {
    this.selectRingImage.click()
  }

  cancelRing = () => {
    var link = document.getElementById('ringList-link')
    link.click()
  }

  SelectRingMember(data, index, e) {
    if (data) {
      this.state.selectedMemberItems = this.state.selectedMemberItems
        ? this.state.selectedMemberItems
        : []
      data.isSelected = data.isSelected ? false : true
      let existData = this.state.selectedMemberItems.filter(
        (item) => item.id == data.id
      )
      if (!data.isSelected && existData && existData.length) {
        this.setState({
          selectedMemberItems: this.state.selectedMemberItems.filter(
            (item) => item.id != data.id
          ),
        })
      } else if (data.isSelected && (!existData || !existData.length)) {
        this.state.selectedMemberItems.push(data)
        this.setState({ selectedMemberItems: this.state.selectedMemberItems })
      }
    }
  }

  deleteRingMember() {
    AlertService.warning().then((response) => {
      if (response && response.isConfirmed) {
        let members = []
        let request = []
        this.state.selectedMemberItems.map((obj, ind) => {
          if (obj.id) {
            members.push(obj.id)
          } else if (obj.ringRequestedId) {
            request.push(obj.ringRequestedId)
          }
        })
        Service.DeleteRingMember(
          this.state.AccessToken,
          this.state.userid,
          this.state.ringid,
          members,
          request
        )
          .then((response) => {
            if (response != false) {
              this.state.ringMembers.map((obj, ind) => {
                obj.isSelected = false
              })
              this.setState({
                selectedMemberItems: [],
                isRequestExist:
                  response &&
                  response.length &&
                  response.filter((item) => item.requestStatus == 1).length > 0
                    ? true
                    : false,
                ringMembers: response ? response : [],
                filterRingMembers: response ? response : [],
              })
            }
          })
          .catch(function (error) {
            this.setState({ selectedMemberItems: [] })
          })
      } else {
        this.state.ringMembers.map((obj, ind) => {
          obj.isSelected = false
        })
        this.setState({
          ringMembers: this.state.ringMembers,
          filterRingMembers: this.state.ringMembers,
          selectedMemberItems: [],
        })
      }
    })
  }

  searchNewMember(val) {
    this.setState({ serachvalue: val })
    this.debouncedNewMemberSearch(val)
  }

  debouncedNewMemberSearch = debounce(function (val) {
    if (this.state.isListenerAdded) {
      window.removeEventListener('click', this.clickListener)
    }
    this.setState(
      {
        ...this.state,
        isListenerAdded: false,
        searchedMembers: [],
      },
      () => {
        if (val && val.length > 1) {
          let tempMember = this.state.existMembers.filter(
            (sitem) =>
              sitem.label &&
              sitem.label.toLowerCase().includes(val.toLowerCase())
          )
          let tempMembers = []
          Service.getSearchedUser(this.state.AccessToken, val)
            .then((response) => {
              if (response && response.length) {
                tempMember.map((item, ind) => {
                  if (item.mail) {
                    let filteredItem = response.filter(
                      (sitem) =>
                        sitem.mail &&
                        sitem.mail
                          .toLowerCase()
                          .includes(item.mail.toLowerCase())
                    )
                    if (!filteredItem || !filteredItem.length) {
                      tempMembers.push(item)
                    }
                  }
                })
                tempMember = tempMembers.concat(response)
              }
              this.getUserPhoto(tempMember)
            })
            .catch(function (error) {
              this.getUserPhoto(tempMember)
            })
        }
      }
    )
  }, 700)

  getUserPhoto(datas) {
    let tempData = []
    let promises = []
    datas.map((result, index) => {
      if (result.photoId) {
        promises.push(
          Service.GetImageUri(this.state.AccessToken, result.photoId).then(
            (response) => {
              result.imageurl = response
              tempData.push(result)
            }
          )
        )
      } else {
        tempData.push(result)
      }
    })
    Promise.all(promises).then(() => {
      this.setState(
        {
          ...this.state,
          searchedMembers: tempData,
        },
        () => {
          if (this.state.searchedMembers && this.state.searchedMembers.length) {
            window.addEventListener('click', this.clickListener)
            this.setState({
              isListenerAdded: true,
            })
          }
        }
      )
    })
  }

  searchRingMember(name, email, title, location, role, request) {
    this.debouncedRingMemberSearch(name, email, title, location, role, request)
  }

  debouncedRingMemberSearch = debounce(function (
    name,
    email,
    title,
    location,
    role,
    request
  ) {
    if (this.state.filterRingMembers && this.state.filterRingMembers.length) {
      if (this.state.isShowPaging && window.$('#tblRingMembers').dataTable()) {
        window.$('#tblRingMembers').dataTable().fnDestroy()
      }
      let query = this.state.filterRingMembers.filter(
        (item) =>
          !name ||
          (name &&
            ((item.firstName &&
              item.lastName &&
              (item.firstName + ' ' + item.lastName)
                .toLowerCase()
                .includes(name.toLowerCase())) ||
              (item.firstName &&
                item.firstName.toLowerCase().includes(name.toLowerCase())) ||
              (item.lastName &&
                item.lastName.toLowerCase().includes(name.toLowerCase()))))
      )
      query = query.filter(
        (item) =>
          !email ||
          (email &&
            item.emailAddress &&
            item.emailAddress.toLowerCase().includes(email.toLowerCase()))
      )
      query = query.filter(
        (item) =>
          !title ||
          (title &&
            item.designation &&
            item.designation.toLowerCase().includes(title.toLowerCase()))
      )
      query = query.filter(
        (item) =>
          !location ||
          (location &&
            ((item.country &&
              item.city &&
              (item.country + ' ' + item.city)
                .toLowerCase()
                .includes(location.toLowerCase())) ||
              (item.country &&
                item.country.toLowerCase().includes(location.toLowerCase())) ||
              (item.city &&
                item.city.toLowerCase().includes(location.toLowerCase()))))
      )
      query = query.filter(
        (item) =>
          !request ||
          (request &&
            item.requestStatusName &&
            item.requestStatusName
              .toLowerCase()
              .includes(request.toLowerCase()))
      )
      query = query.filter(
        (item) =>
          !role ||
          (role &&
            item.roleName &&
            item.roleName.toLowerCase().includes(role.toLowerCase()))
      )
      this.setState(
        {
          ...this.state,
          searchFullName: name,
          searchEmail: email,
          searchTitle: title,
          searchLocation: location,
          searchRole: role,
          searchRequest: request,
          ringMembers: [],
          isShowPaging: false,
        },
        () => {
          this.setState(
            {
              ...this.state,
              ringMembers: query,
            },
            () => {
              if (this.state.ringMembers && this.state.ringMembers.length > 8) {
                this.setPagination()
              }
            }
          )
        }
      )
    }
  },
  800)

  SendRingRequest(item) {
    AlertService.confirmation(
      'Confirmation',
      'Are you sure you want to send invitation again?',
      'warning',
      'Yes'
    ).then((res) => {
      if (res && res.isConfirmed) {
        this.setState({
          isLoading: true,
        })
        let postItem = JSON.stringify(item)
        postItem = JSON.parse(postItem)
        postItem.ringName = this.state.ringname
        Service.InviteAgainRingRequest(
          this.state.AccessToken,
          this.state.userid,
          postItem
        )
          .then((response) => {
            if (response && response.isSend) {
              AlertService.warningInfo(
                'Ring Request Invitation',
                "<span style = 'font-family: Myriad Pro;font-style: normal;font-weight: 400;font-size: 16px;line-height: 24px;text-align: center;'>An email notification has been sent to " +
                  postItem.emailAddress +
                  '. Once they accept, they will be added to the ring.</span >',
                'success'
              ).then((res) => {
                this.GetRingMembers()
              })
            }
            this.setState({
              isLoading: false,
            })
          })
          .catch(function (error) {
            this.setState({
              isLoading: false,
            })
            alert(JSON.stringify(error))
          })
      }
    })
  }

  CancelRingRequest(item) {
    AlertService.confirmation(
      'Confirmation',
      'Are you sure you want to cancel the invitation?',
      'warning',
      'Yes'
    ).then((res) => {
      if (res && res.isConfirmed) {
        Service.CancelRingRequest(this.state.AccessToken, item.ringRequestedId)
          .then((response) => {
            if (response && response.isSend) {
              AlertService.warningInfo(
                'Information',
                "<span style = 'color:green',fontWeight: 'bold' >Ring member join request has been cancelled successfully.</span >",
                'success'
              ).then((res) => {
                this.GetRingMembers()
              })
            }
          })
          .catch(function (error) {
            alert(JSON.stringify(error))
          })
      }
    })
  }

  onChangeInput = (e, item, ind) => {
    Swal.fire({
      title: 'Save Changes',
      text: 'Are you sure you want to make these changes?',
      icon: 'warning',
      showCancelButton: true,
      width: 600,
      customClass: {
        cancelButton: 'cancel-swal',
        confirmButton: 'confirm-swal',
      },
      confirmButtonText: 'Save',
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        item.roleId = e.target.value
        item.isMouseEnter = 0
        let role = this.state.ringRoles.filter(
          (sitem) => sitem.id == item.roleId
        )
        if (role && role.length) {
          item.roleName = role[0].name
        }
        let ringMembers = [...this.state.ringMembers]
        ringMembers[ind] = item
        this.setState({ ringMembers })
        this.UpdateMemberDetails(e.target.value, item.id, item.ringRequestedId)
        Swal.fire({
          title: 'Changes Saved!',
          width: 600,
          height: 369,
          text: '',
          icon: 'success',
          showCloseButton: true,
          customClass: {
            confirmButton: 'confirm-swal',
          },
        })
      }
    })
  }

  UpdateMemberDetails(ringsvalue, ringsid, requestId = '') {
    var self = this
    Service.UpdateMemberDetails(self, ringsvalue, ringsid, requestId).then(
      (response) => {
        //self.GetRingMembers();
      }
    )
  }

  handleOnChange = (e) => {
    let self = this
    Papa.parse(e.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        //   console.log(results.data)
        if (results.data && results.data.length) {
          let groupData = []
          results.data.forEach((element) => {
            groupData.push({
              firstName: element.firstName ? element.firstName : '',
              lastName: element.lastName ? element.lastName : '',
              emailAddress: element.emailAddress ? element.emailAddress : '',
              title: element.title ? element.title : '',
              country: element.country ? element.country : '',
              city: element.city ? element.city : '',
              roleId: element.roleId ? element.roleId : '1',
              ringId: self.state.ringid,
              id: element.id,
              userRoleId: element.userRoleId ? element.userRoleId : '3',
              isOrgUser:
                !element.isOrgUser || element.isOrgUser == 'true'
                  ? true
                  : false,
              userId: self.state.userid,
            })
          })
          self.setState({
            groupmemberdata: groupData,
            showgroupMember: true,
            groupmemberPopupHeader: 'Add Member',
          })
        }
      },
    })
  }

  isMouseEnter(item, val) {
    item.isMouseEnter = val
  }

  clickListener(e) {
    if (this.state.isListenerAdded) {
      this.setState(
        {
          ...this.state,
          isListenerAdded: false,
        },
        () => {
          this.setState({ searchedMembers: [] })
          window.removeEventListener('click', this.clickListener)
        }
      )
    }
  }

  isMemberMouseEnter(item, val, ind) {
    item.isMouseEnter = val
    let ringMembers = [...this.state.ringMembers]
    ringMembers[ind] = item
    this.setState({ ringMembers })
  }

  EditRing() {
    this.setState({
      showSetting: true,
      showMembers: false,
      showmatching: false,
      activeId: '1',
    })
  }

  isShowUserDetail = debounce((eve, item, val, ind) => {
    eve.stopPropagation()
    item.isShowUserDetail = val
    let ringMembers = [...this.state.ringMembers]
    ringMembers[ind] = item
    this.setState({ ringMembers })
  }, 800)

  onImageInvalid(item) {
    item.imageurl = ''
    this.setState({
      searchedMembers: this.state.searchedMembers.map((el) =>
        el.id === item.id ? { ...el, item } : el
      ),
    })
  }

  //isShowUserDetail(eve, item, val, ind) {
  //    eve.stopPropagation();
  //    item.isShowUserDetail = val;
  //    let ringMembers = [...this.state.ringMembers];
  //    ringMembers[ind] = item;
  //    this.setState({ ringMembers });
  //}

  render() {
    const buttonEnabled =
      this.state.selectedMemberItems &&
      this.state.selectedMemberItems.length > 0
    return (
      <div className="height-95 px-5">
        <Loader isLoading={this.state.isLoading}></Loader>
        <div className="add_manager_form">
          <div className="breadcrumb d-flex align-items-center fs-3 text-dark mb-4">
            <div style={{ width: '60%' }}>
              <div className="fs-3 breadcrumb d-flex align-items-center  ">
                <span style={{ fontSize: '28px' }}>Programs</span>
                <span className="px-2 fs-3">&#62;</span>
                <span style={{ fontSize: '28px' }}>Manage</span>
                <span className="px-2 fs-3">&#62;</span>
                <span style={{ fontSize: '28px' }}>
                  {this.state.ringid ? this.state.ringname : 'New'}
                </span>
                <span className="px-2 fs-3">&#62;</span>
                <span className="fs-3 font-bold">
                  {this.state.showSetting
                    ? 'Settings'
                    : this.state.showMembers
                    ? 'Members'
                    : 'Matching Criteria'}
                </span>
              </div>
            </div>

            <div style={{ float: 'right', width: '40%', textAlign: 'right' }}>
              {this.state != null && this.state.showSetting == true && (
                <button
                  onClick={() => this.cancelRing()}
                  className="border-Button btn btn-outline btn-app px-4 py-1 w-110px"
                >
                  Cancel
                </button>
              )}
              {this.state != null && this.state.showSetting !== true && (
                <button
                  onClick={() =>
                    this.Toggletab(
                      true,
                      this.state.showmatching == true ? '2' : '1'
                    )
                  }
                  className="border-Button btn btn-outline btn-app px-4 py-1 w-110px"
                >
                  Back
                </button>
              )}
              <button
                style={{ marginLeft: '4px' }}
                disabled={!this.state.ringname}
                onClick={() => this.SaveRing(true)}
                className="btn btn-app py-1 px-4 w-110px"
              >
                {this.state.ringid ? 'Update' : 'Save'}
              </button>
              {this.state != null && this.state.showmatching !== true && (
                <button
                  disabled={!this.state.ringname}
                  style={{ marginLeft: '4px' }}
                  className="border-Button btn btn-outline btn-app px-4 py-1 w-110px"
                  onClick={() =>
                    this.Toggletab(
                      true,
                      this.state.showSetting == true ? '2' : '3'
                    )
                  }
                >
                  Next
                </button>
              )}

              <NavLink
                id="ringList-link"
                style={{ display: 'none' }}
                tag={Link}
                to={`/RingList`}
              ></NavLink>
            </div>
          </div>

          <div
            className="d-flex align-items-center mb-4"
            ref={(node) => {
              if (node) {
                node.style.setProperty(
                  'display',
                  this.state.showSetting ? 'block' : 'none',
                  'important'
                )
              }
            }}
          >
            <div
              className="d-inline-flex add-picture"
              onClick={() => this.changeRingImage()}
            >
              <img
                src={this.state.imagedata}
                alt=""
                className="img-fluid p-2"
              />
              <div
                className="upload-pic"
                style={{ display: 'flex', position: 'absolute' }}
              >
                {/* <input type='file' className={this.state.ringid ? 'file-upload-edit-input' : 'file-upload-input'} id='ringImage' ref={(file) => { this.selectRingImage = file; }} onChange={(e) => this.onChangeRingImage(e)}
                                    name='ringImage' accept="image/png, image/gif, image/jpeg, image/jpg" style={{ display: "none" }} /> */}
                <input
                  type="file"
                  className="file-upload-input"
                  id="ringImage"
                  ref={(file) => {
                    this.selectRingImage = file
                  }}
                  onChange={(e) => this.onChangeRingImage(e)}
                  name="ringImage"
                  accept="image/png, image/gif, image/jpeg, image/jpg"
                  style={{ display: 'none' }}
                />

                <label
                  style={{
                    minWidth: '274px',
                    maxWidth: '250px',
                    paddingTop: '25px',
                    paddingLeft: '70px',
                  }}
                  className="file-upload-label"
                >
                  {this.state.ringid
                    ? 'Change Program Picture'
                    : 'Add a Program Picture'}
                </label>
              </div>
            </div>
            {/* <div className="ps-3 picture-label">{this.state.ringid ? 'Change Ring Picture' :'Add a Ring Picture'}</div>*/}
          </div>
          <div
            className="row"
            style={{ display: this.state.showSetting ? 'block' : 'none' }}
          >
            <div className="col-lg-4 col-md-6">
              <div className="custom-form-group mb-4">
                <label className="form-label mb-1" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  maxLength="50"
                  className="form-control"
                  id="name"
                  name="name"
                  value={this.state.ringname}
                  autoComplete="off"
                  onChange={(e) =>
                    this.setState({
                      ringname: e.target.value.replace(
                        /[`~!@#$%^*()_|+\=?;:",<>\{\}\[\]\\\/]/gi,
                        ''
                      ),
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div
            className="row"
            style={{ display: this.state.showSetting ? 'block' : 'none' }}
          >
            <div className="col-lg-4 col-md-6">
              <div className="custom-form-group mb-3">
                <label className="form-label mb-1" htmlFor="description">
                  Description
                </label>
                <textarea
                  maxLength="500"
                  className="form-control"
                  id="description"
                  name="description"
                  value={this.state.description}
                  autoComplete="off"
                  onChange={(e) =>
                    this.setState({
                      description: e.target.value.replace(
                        /[`~!@#$%^*()_|+\=?;:",<>\{\}\[\]\\\/]/gi,
                        ''
                      ),
                    })
                  }
                ></textarea>
              </div>
            </div>
          </div>

          <div
            className="row"
            style={{
              display: this.state.showSetting != true ? 'block' : 'none',
            }}
          >
            <div
              className="row"
              ref={(node) => {
                if (node) {
                  node.style.setProperty('margin-left', '13px', 'important')
                  node.style.setProperty('padding-right', '0px', 'important')
                }
              }}
            >
              <div className="row form-control" style={{ height: '100px' }}>
                <div style={{ width: '6%', float: 'left' }}>
                  <div style={{ width: '100%', color: '#999999' }}></div>
                  <div style={{ width: '100%', marginTop: '20px' }}>
                    <div
                      style={{ marginTop: '28px' }}
                      className="table-profile-name"
                    >
                      {((!this.state.photoId && this.state.ringid) ||
                        (!this.state.ringImage && !this.state.ringid)) &&
                        this.state.ringname &&
                        (this.state.ringname.match(/\b(\w)/g)
                          ? this.state.ringname
                              .match(/\b(\w)/g)
                              .join('')
                              .toUpperCase()
                          : this.state.ringname)}
                      {((this.state.photoId && this.state.ringid) ||
                        (this.state.ringImage && !this.state.ringid)) &&
                        this.state.imagedata && (
                          <img
                            src={this.state.imagedata}
                            alt=""
                            className="img-fluid p-2"
                          />
                        )}
                    </div>
                  </div>
                </div>
                <div style={{ width: '27%', float: 'left' }}>
                  <div className="ring-detail-header font-size-12px">Name</div>
                  <div className="ring-detail-data font-size-16px">
                    {this.state.ringname}
                  </div>
                </div>
                <div style={{ width: '10%', float: 'left' }}>
                  <div className="ring-detail-header font-size-12px">
                    Mentees
                  </div>
                  <div className="ring-detail-data font-size-16px">
                    {this.state.mentees}
                  </div>
                </div>
                <div style={{ width: '10%', float: 'left' }}>
                  <div className="ring-detail-header font-size-12px">
                    Mentors
                  </div>
                  <div className="ring-detail-data font-size-16px">
                    {this.state.mentors}
                  </div>
                </div>
                <div style={{ width: '10%', float: 'left' }}>
                  <div className="ring-detail-header font-size-12px">Type</div>
                  <div className="ring-detail-data font-size-16px">
                    {this.state.ringTypeName}
                  </div>
                </div>
                <div style={{ width: '10%', float: 'left' }}>
                  <div className="ring-detail-header font-size-12px">
                    Status
                  </div>
                  <div className="ring-detail-data font-size-16px">
                    {this.state.status ? 'Active' : 'Inactive'}
                  </div>
                </div>
                <div style={{ width: '27%', float: 'left' }}>
                  <div className="ring-detail-header font-size-12px">
                    Description
                  </div>
                  <div className="ring-detail-data font-size-16px">
                    {this.state.description}
                  </div>
                </div>
                <div style={{ marginLeft: '60px' }}>
                  <button
                    type="submit"
                    className="btn btn-default mr-2 manage_ring_edit"
                    onClick={(e) => this.EditRing()}
                  >
                    <img src="img/icons/Settings_red.svg" alt="image" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <ul
            className="nav nav-tabs mt-4 add-manage-ul"
            style={{ width: '100%' }}
          >
            <li className="nav-item">
              <NavLink
                style={{ cursor: 'pointer' }}
                className={`text-dec-none font-size-20px nav-link add-manage ${
                  this.state.activeId === '1'
                    ? 'active active-RingTab'
                    : 'inactives'
                }`}
                onClick={() => this.Toggletab(true, '1')}
                id="ProjectAndTravel"
              >
                Settings
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                style={{ cursor: 'pointer' }}
                className={`text-dec-none font-size-20px nav-link add-manage  ${
                  this.state.activeId === '2'
                    ? 'active active-RingTab'
                    : 'inactives'
                }`}
                onClick={() => this.state.ringname && this.Toggletab(true, '2')}
                id="ProjectAndTravel"
              >
                Members
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                style={{ cursor: 'pointer' }}
                className={`text-dec-none font-size-20px nav-link add-manage ${
                  this.state.activeId === '3'
                    ? 'active active-RingTab'
                    : 'inactives'
                }`}
                onClick={() => this.state.ringname && this.Toggletab(true, '3')}
                id="ProjectAndTravel"
              >
                Matching criteria
              </NavLink>
            </li>
          </ul>

          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade w-100 pb-5 "
              style={{ display: this.state.showSetting ? 'contents' : 'none' }}
            >
              <div className="container-fluid settings">
                <ManageSettings
                  parentCallback={this.getManageSettingCallback}
                  manageContent={this.state}
                />
              </div>
            </div>
            {this.state.showMembers && (
              <div className=" w-100 pb-5">
                <RingMembers data={this.state} />
                {/* <div className='member_header'>Add members to your program. Internal members can be added using the search bar. To add external members, click the ‘Add’ button. </div>
                            <div className="bg-color rounded p-2 d-flex align-items-center justify-content-between" style={{marginTop: "2rem"}}>

                                {this.state != null && this.state.showsearch === true && (
                                    <div className="mentorBench-Search search d-inline-flex align-items-center ps-3 me-3">
                                        <i className="fas fa-search"></i>
                                        <input type="text" className="form-control bg-transparent border-0 inputSearch" placeholder="Search"
                                            name="" value={this.state.serachvalue} onChange={(e) => this.searchNewMember(e.target.value)} />
                                    </div>
                                )}

                                <div style={{ marginLeft: (this.state.showsearch == true ? "0%" : "60%") }} className="list-actions d-flex align-items-center mentorBench-SearchButtons">
                                    <a onClick={() => this.showMember({})}
                                        className="action-item btn btn-sm lh-1 d-flex align-items-center font-light fs-5 text-dark">
                                        <i className="bi bi-plus fs-3"></i>
                                        <span className="font-size-20px" style={{ marginLeft: "-5px"}}>Add</span>
                                    </a>
                                    <NavLink style={{ marginLeft: "10px", maxWidth: "100px", paddingLeft: "0px", paddingRight:"0px" }} disabled={!buttonEnabled} onClick={() => this.deleteRingMember()}
                                        className={`action-item btn btn-sm lh-1 d-flex align-items-center font-light fs-5`}>
                                        <i className="bi bi-x fs-4 me-1"></i><span className="font-size-20px" style={{ marginLeft: "-8px"}}>Delete</span>
                                    </NavLink>
                                    <a className="action-item btn btn-sm lh-1 d-flex align-items-center font-light fs-5 text-dark " style={{ marginLeft: "10px", marginRight:"10px", fontFamily: "font-light", minWidth: "175px" }}>
                                        <i className="fa fa-upload icon-members_export" style={{ fontSize: "18px" }} >
                                            <input
                                                type={"file"}
                                                id={"csvFileInput"}
                                                accept={".csv"}
                                                onChange={this.handleOnChange}
                                            />
                                        </i>
                                        <span className='members_export font-size-20px' style={{paddingLeft: "3px" }}>Import Members</span>
                                    </a>
                                    <ExportReactCSV  />
                                </div>
                            </div>
                          
                            {this.state != null && this.state.searchedMembers && this.state.searchedMembers.length > 0 && (
                                <div className="dropdown">
                                    {this.state.searchedMembers.map((item, index) => (
                                        <div key={index + 1} onClick={() => this.showMember(item, true)}
                                            className={item.isMouseEnter ? 'custom-dropdown-item dl-mouse-over-item d-flex align-items-center' : 'custom-dropdown-item d-flex align-items-center'} onMouseEnter={() => this.isMouseEnter(item, true)} onMouseLeave={() => this.isMouseEnter(item, false)}>
                                            {item.imageurl ? (<div className="" style={{ lineHeight: "38px" }} >
                                                <img src={item.imageurl} alt="" onError={() => this.onImageInvalid(item)} className="rounded-circle css_profile_cell" />
                                            </div>) : (<div className="table-cell-profile-name">
                                                {item.label && item.label.match(/\b(\w)/g) ? item.label.match(/\b(\w)/g).join('').toUpperCase() : item.label.toUpperCase()}
                                            </div>)}
                                            <div>
                                                <span style={{ float: "left", width: "100%" }} className="fs-6 ps-3 ring_color">{item.label}</span>
                                                <span className="custom-dropdown-item-mail ps-3 ring_color">{item.mail}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                             <div className="table-responsive mt-3">

                                <table className="table" id="tblRingMembers">
                                    <thead>
                                        <tr>
                                            <th className="selectBox" ref={(node) => { if (node) { node.style.setProperty("width", "6%", "important"); } }}></th>
                                            <th ref={(node) => { if (node) { node.style.setProperty("width", "17%", "important"); } }}>
                                                <Tippy content={<span>Full Name</span>}>
                                                    <input autoComplete="none" style={{ width: "90%", float: "left" }} type="text" className="ellipsis-header table-header-input form-control bg-transparent border-0 inputSearch"
                                                        placeholder="Full Name"
                                                        onChange={(e) => this.searchRingMember(e.target.value, this.state.searchEmail, this.state.searchTitle, this.state.searchLocation, this.state.searchRole, this.state.searchRequest)} />
                                                </Tippy>
                                                <div style={{ width: "10%", float: "right", textAlign: "right", color: this.state.selectedCol == 1 ? "black" : "gainsboro" }}>
                                                    {this.state != null && (this.state.selectedCol != 1 || this.state.isNameSortAsc == true) && (
                                                        <span onClick={() => this.changeMemberSortOrder((this.state.selectedCol == 1 ? !this.state.isNameSortAsc : true), this.state.isEmailSortAsc, this.state.isTitleSortAsc, this.state.isLocationSortAsc, this.state.isRoleSortAsc, 1, this.state.isRequestSortAsc)} style={{ cursor: "pointer" }}>&#8593;</span>
                                                    )}
                                                    {this.state != null && this.state.isNameSortAsc != true && this.state.selectedCol == 1 && (
                                                        <span onClick={() => this.changeMemberSortOrder(!this.state.isNameSortAsc, this.state.isEmailSortAsc, this.state.isTitleSortAsc, this.state.isLocationSortAsc, this.state.isRoleSortAsc, 1, this.state.isRequestSortAsc)} style={{ cursor: "pointer" }}>&#8595;</span>
                                                    )}
                                                </div>
                                            </th>
                                            <th ref={(node) => { if (node) { node.style.setProperty("width", "17%", "important"); } }}>
                                                <Tippy content={<span>Email</span>}>
                                                    <input autoComplete="none" style={{ width: "90%", float: "left" }} type="text" className="ellipsis-header table-header-input form-control bg-transparent border-0 inputSearch"
                                                        placeholder="Email"
                                                        onChange={(e) => this.searchRingMember(this.state.searchFullName, e.target.value, this.state.searchTitle, this.state.searchLocation, this.state.searchRole, this.state.searchRequest)} />
                                                </Tippy>
                                                <div style={{ width: "10%", float: "right", textAlign: "right", color: this.state.selectedCol == 2 ? "black" : "gainsboro" }}>
                                                    {this.state != null && (this.state.selectedCol != 2 || this.state.isEmailSortAsc == true) && (
                                                        <span onClick={() => this.changeMemberSortOrder(this.state.isNameSortAsc, (this.state.selectedCol == 2 ? !this.state.isEmailSortAsc : true), this.state.isTitleSortAsc, this.state.isLocationSortAsc, this.state.isRoleSortAsc, 2, this.state.isRequestSortAsc)} style={{ cursor: "pointer" }}>&#8593;</span>
                                                    )}
                                                    {this.state != null && this.state.isEmailSortAsc != true && this.state.selectedCol == 2 && (
                                                        <span onClick={() => this.changeMemberSortOrder(this.state.isNameSortAsc, !this.state.isEmailSortAsc, this.state.isTitleSortAsc, this.state.isLocationSortAsc, this.state.isRoleSortAsc, 2, this.state.isRequestSortAsc)} style={{ cursor: "pointer" }}>&#8595;</span>
                                                    )}
                                                </div>
                                            </th>
                                            <th ref={(node) => { if (node) { node.style.setProperty("width", "16%", "important"); } }}>
                                                <Tippy content={<span>Title</span>}>
                                                    <input autoComplete="none" style={{ width: "90%", float: "left" }} type="text" className="ellipsis-header table-header-input form-control bg-transparent border-0 inputSearch"
                                                        placeholder="Title"
                                                        onChange={(e) => this.searchRingMember(this.state.searchFullName, this.state.searchEmail, e.target.value, this.state.searchLocation, this.state.searchRole, this.state.searchRequest)} />
                                                </Tippy>
                                                <div style={{ width: "10%", float: "right", textAlign: "right", color: this.state.selectedCol == 3 ? "black" : "gainsboro" }}>
                                                    {this.state != null && (this.state.selectedCol != 3 || this.state.isTitleSortAsc == true) && (
                                                        <span onClick={() => this.changeMemberSortOrder(this.state.isNameSortAsc, this.state.isEmailSortAsc, (this.state.selectedCol == 3 ? !this.state.isTitleSortAsc : true), this.state.isLocationSortAsc, this.state.isRoleSortAsc, 3, this.state.isRequestSortAsc)} style={{ cursor: "pointer" }}>&#8593;</span>
                                                    )}
                                                    {this.state != null && this.state.isTitleSortAsc != true && this.state.selectedCol == 3 && (
                                                        <span onClick={() => this.changeMemberSortOrder(this.state.isNameSortAsc, this.state.isEmailSortAsc, !this.state.isTitleSortAsc, this.state.isLocationSortAsc, this.state.isRoleSortAsc, 3, this.state.isRequestSortAsc)} style={{ cursor: "pointer" }}>&#8595;</span>
                                                    )}
                                                </div>
                                            </th>
                                            <th ref={(node) => { if (node) { node.style.setProperty("width", "16%", "important"); } }}>
                                                <Tippy content={<span>Location</span>}>
                                                    <input autoComplete="none" style={{ width: "90%", float: "left" }} type="text" className="ellipsis-header table-header-input form-control bg-transparent border-0 inputSearch"
                                                        placeholder="Location"
                                                        onChange={(e) => this.searchRingMember(this.state.searchFullName, this.state.searchEmail, this.state.searchTitle, e.target.value, this.state.searchRole, this.state.searchRequest)} />
                                                </Tippy>
                                                <div style={{ width: "10%", float: "right", textAlign: "right", color: this.state.selectedCol == 4 ? "black" : "gainsboro" }}>
                                                    {this.state != null && (this.state.selectedCol != 4 || this.state.isLocationSortAsc == true) && (
                                                        <span onClick={() => this.changeMemberSortOrder(this.state.isNameSortAsc, this.state.isEmailSortAsc, this.state.isTitleSortAsc, (this.state.selectedCol == 4 ? !this.state.isLocationSortAsc : true), this.state.isRoleSortAsc, 4, this.state.isRequestSortAsc)} style={{ cursor: "pointer" }}>&#8593;</span>
                                                    )}
                                                    {this.state != null && this.state.isLocationSortAsc != true && this.state.selectedCol == 4 && (
                                                        <span onClick={() => this.changeMemberSortOrder(this.state.isNameSortAsc, this.state.isEmailSortAsc, this.state.isTitleSortAsc, !this.state.isLocationSortAsc, this.state.isRoleSortAsc, 4, this.state.isRequestSortAsc)} style={{ cursor: "pointer" }}>&#8595;</span>
                                                    )}
                                                </div>
                                            </th>
                                            <th ref={(node) => { if (node) { node.style.setProperty("width", "10%", "important"); } }}>
                                                <Tippy content={<span>Role</span>}>
                                                    <input autoComplete="none" type="text" className="ellipsis-header ring-role-input table-header-input form-control bg-transparent border-0 inputSearch"
                                                        placeholder="Role"
                                                        onChange={(e) => this.searchRingMember(this.state.searchFullName, this.state.searchEmail, this.state.searchTitle, this.state.searchLocation, e.target.value, this.state.searchRequest)} />
                                                </Tippy>
                                                <div style={{ width: "10%", float: "right", textAlign: "right", color: this.state.selectedCol == 5 ? "black" : "gainsboro" }}>
                                                    {this.state != null && (this.state.selectedCol != 5 || this.state.isRoleSortAsc == true) && (
                                                        <span onClick={() => this.changeMemberSortOrder(this.state.isNameSortAsc, this.state.isEmailSortAsc, this.state.isTitleSortAsc, this.state.isLocationSortAsc, (this.state.selectedCol == 5 ? !this.state.isRoleSortAsc : true), 5, this.state.isRequestSortAsc)} style={{ cursor: "pointer" }}>&#8593;</span>
                                                    )}
                                                    {this.state != null && this.state.isRoleSortAsc != true && this.state.selectedCol == 5 && (
                                                        <span onClick={() => this.changeMemberSortOrder(this.state.isNameSortAsc, this.state.isEmailSortAsc, this.state.isTitleSortAsc, this.state.isLocationSortAsc, !this.state.isRoleSortAsc, 5, this.state.isRequestSortAsc)} style={{ cursor: "pointer" }}>&#8595;</span>
                                                    )}
                                                </div>
                                            </th>
                                            <th ref={(node) => { if (node) { node.style.setProperty("width", "18%", "important"); } }}>
                                                <Tippy content={<span>Request Status</span>}>
                                                    <input autoComplete="none" style={{ width: "90%", float: "left" }} type="text" className="ellipsis-header table-header-input form-control bg-transparent border-0 inputSearch"
                                                        placeholder="Request Status"
                                                        onChange={(e) => this.searchRingMember(this.state.searchFullName, this.state.searchEmail, this.state.searchTitle, this.state.searchLocation, this.state.searchRole, e.target.value)} />
                                                </Tippy>
                                                <div style={{ width: "10%", float: "right", textAlign: "right", color: this.state.selectedCol == 6 ? "black" : "gainsboro" }}>
                                                    {this.state != null && (this.state.selectedCol != 6 || this.state.isRequestSortAsc == true) && (
                                                        <span onClick={() => this.changeMemberSortOrder(this.state.isNameSortAsc, this.state.isEmailSortAsc, this.state.isTitleSortAsc, this.state.isLocationSortAsc, this.state.isRoleSortAsc, 6, (this.state.selectedCol == 6 ? !this.state.isRequestSortAsc : true))} style={{ cursor: "pointer" }}>&#8593;</span>
                                                    )}
                                                    {this.state != null && this.state.isRequestSortAsc != true && this.state.selectedCol == 6 && (
                                                        <span onClick={() => this.changeMemberSortOrder(this.state.isNameSortAsc, this.state.isEmailSortAsc, this.state.isTitleSortAsc, this.state.isLocationSortAsc, this.state.isRoleSortAsc, 6, !this.state.isRequestSortAsc)} style={{ cursor: "pointer" }}>&#8595;</span>
                                                    )}
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <colgroup ref={(node) => { if (node) { node.style.setProperty("border-top", "none", "important"); } }}>
                                        <col width="6%" />
                                        <col width="17%" />
                                        <col width="17%" />
                                        <col width="16%" />
                                        <col width="16%" />
                                        <col width="10%" />
                                        <col width="18%" />
                                    </colgroup>
                                    <tbody>
                                        {this.state.ringMembers.map((result, index) => {
                                            return (
                                                <tr key={index + 1} onMouseEnter={() => this.isMemberMouseEnter(result, 1, index)} onMouseLeave={() => this.isMemberMouseEnter(result, 0, index)}>
                                                    <td>
                                                        <div className="form-check d-flex align-items-center">
                                                            <input className="form-check-input" type="checkbox" value={result.isSelected} checked={result.isSelected}
                                                                onChange={(e) => this.SelectRingMember(result, index, e)} />

                                                            <Tooltip content={<UserTooltip user={result} userindex={index} />} direction="top">
                                                                <div style={{ paddingLeft: "5px", paddingRight: "3px" }} className="d-flex align-items-center">
                                                                    {result.imageurl ? (<div className="" style={{ lineHeight: "38px" }} >
                                                                        <img src={result.imageurl} alt="" className="rounded-circle css_profile" />
                                                                    </div>) : (<div className="table-profile-name">
                                                                        {(result.firstName + ' ' + result.lastName).match(/\b(\w)/g) ? (result.firstName + ' ' + result.lastName).match(/\b(\w)/g).join('').toUpperCase() : (result.firstName + ' ' + result.lastName)}
                                                                    </div>)}
                                                                </div>
                                                            </Tooltip>
                                                        </div>
                                                    </td>
                                                    <td className="ellipsis-content">
                                                        <OverflowTip>
                                                            {result.firstName + ' ' + result.lastName}
                                                        </OverflowTip>
                                                    </td>
                                                    <td className="ellipsis-content">
                                                        <OverflowTip>
                                                            {result.emailAddress}
                                                        </OverflowTip>
                                                    </td>
                                                    <td className="ellipsis-content">
                                                        <OverflowTip>
                                                            {result.designation}
                                                        </OverflowTip>
                                                    </td>
                                                    <td className="ellipsis-content">
                                                        <OverflowTip>
                                                            {result.country && result.city ? (result.country + ' - ' + result.city) : (result.country + ' ' + result.city)}
                                                        </OverflowTip>
                                                    </td>
                                                    <td className="ellipsis-content">
                                                        {result.isMouseEnter == 1 && (
                                                            <select className='ring-role-select' defaultValue={result.roleId} onChange={(e) => this.onChangeInput(e, result, index)} >
                                                                <option value="2">Mentor</option>
                                                                <option value="1">Mentee</option>
                                                                <option value="3">Admin</option>
                                                            </select>
                                                        )}
                                                        {result.isMouseEnter != 1 && (
                                                            <OverflowTip>
                                                                <span style={{ paddingLeft: "9px" }}>{result.roleName}</span>
                                                            </OverflowTip>
                                                        )}
                                                    </td>
                                                    <td>
                                                        {result.requestStatus == 1 && (
                                                            <>
                                                                <span className="status-invite">{result.requestStatusName}</span>
                                                                <Tippy content={<span>Invite Again</span>}>
                                                                    <button onClick={() => this.SendRingRequest(result)} className="send-request"><i style={{ color: "white" }} className="fa fa-send-o"></i></button>
                                                                </Tippy>
                                                                <Tippy content={<span>Cancel Invite</span>}>
                                                                    <button onClick={() => this.CancelRingRequest(result)} className="cancel-request"><i style={{ color: "white" }} className="fa fa-close"></i></button>
                                                                </Tippy>
                                                            </>
                                                        )}
                                                        {result.requestStatus != 1 && (
                                                            <span className="status-accept">Accepted</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                        {this.state.isLoadedMember && (!this.state.ringMembers || !this.state.ringMembers.length) && (
                                            <tr key="1">
                                                <td colSpan="7">
                                                    <div style={{ textAlign: "center" }}>
                                                        ------ There is no program members ------
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>

                            </div>   */}
              </div>
            )}

            <div
              style={{ display: this.state.showmatching ? 'contents' : 'none' }}
            >
              <div className="d-flex align-items-center justify-content-between">
                <div className="breadcrumb d-flex align-items-center fs-3 font-bold text-dark mb-0"></div>
                <div className="beta">Coming Soon</div>
              </div>
              <div className="row pt-3">
                <div className="col-lg-4 col-md-6 mb-4">
                  <div
                    className="border rounded p-4"
                    ref={(node) => {
                      if (node) {
                        node.style.setProperty(
                          'padding-right',
                          '0px',
                          'important'
                        )
                      }
                    }}
                  >
                    <div className="font-bold mb-3 text-dark font-size-16px">
                      Expertise
                    </div>
                    <div
                      style={{
                        minHeight: '100px',
                        maxHeight: '300px',
                        overflowY: 'auto',
                        paddingRight: '20px',
                      }}
                    >
                      {this.state != null &&
                        this.state.interest != null &&
                        this.state.interest.length > 0 &&
                        this.state.interest.map((obj, index) => {
                          return (
                            <div className="d-flex align-items-center justify-content-between">
                              <div className="form-check d-flex align-items-center mb-2">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="Interests"
                                  value={index}
                                  onClick={() => this.selectInterest(obj)}
                                  disabled
                                />
                                <label
                                  className="form-check-label ps-2 pt-1"
                                  htmlFor="design"
                                >
                                  {obj.key}
                                </label>
                              </div>
                              <div className="font-medium">{obj.value}</div>
                            </div>
                          )
                        })}
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6 mb-4">
                  <div className="border rounded p-4">
                    <div className="font-bold mb-3 text-dark font-size-16px">
                      Values
                    </div>
                    {this.state != null &&
                      this.state.values != null &&
                      this.state.values.length > 0 &&
                      this.state.values.map((obj, index) => {
                        return (
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="form-check d-flex align-items-center mb-2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value={obj.isSelected}
                                disabled
                              />
                              <label
                                className="form-check-label ps-2 pt-1"
                                htmlFor="design"
                              >
                                {obj.key}
                              </label>
                            </div>
                            <div className="font-medium">{obj.value}</div>
                          </div>
                        )
                      })}
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 mb-3">
                  <div className="border rounded p-4">
                    <div className="font-bold mb-3 text-dark font-size-16px">
                      Filter by Years of Experience
                    </div>
                    <Slider
                      value={this.state.range}
                      onChange={this.rangeSelector}
                      valueLabelDisplay="auto"
                      disabled
                    />

                    <div className="row py-2">
                      <div className="col-md-6">
                        <div className="custom-form-group">
                          <input
                            type="text"
                            disabled
                            value={this.state.range[0]}
                            className="form-control"
                            id="min"
                            name="min"
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="custom-form-group">
                          <input
                            type="text"
                            disabled
                            value={this.state.range[1]}
                            className="form-control"
                            id="max"
                            name="max"
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* {
                    this.state != null && this.state.showMember == true && (
                        <Member showMember={this.state.showMember} onCloseMember={this.closeMember} popupHeader={this.state.memberPopupHeader}
                            popupContent={this.state.memberPopupContent} onSaveMember={this.saveMember}></Member>
                    )
                }

                {
                    this.state != null && this.state.showgroupMember == true && (
                        <GroupMember showgroupMember={this.state.showgroupMember} oncloseGroupMember={this.closeGroupMember} popupHeader={this.state.groupmemberPopupHeader}
                            popupContent={this.state.groupmemberdata} onSaveMember={this.saveMember}></GroupMember>
                    )
                } */}
      </div>
    )
  }
}
