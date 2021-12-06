import {datatype} from 'faker'

export default {
  uploadFile: () => {
    return {
      __typename: 'UploadFile',
      fileID: datatype.uuid()
    }
  },
  uploadFileWithUnion: (_, {value}) => {
    if (value !== 'valid') {
      return {
        __typename: 'WrongFileTypeError',
        message: 'Nope...'
      }
    }
    return {
      __typename: 'UploadFile',
      fileID: datatype.uuid()
    }
  }
};
