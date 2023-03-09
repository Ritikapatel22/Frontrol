
import { useEffect, useRef, useState } from "react";
import { useLazyFetchDataQuery } from '../../app/appApi'
import {
  useQueryString,
} from '@frontrolinc/pace-ui-framework'
import './viewFile.css'
import { useTranslation } from 'react-i18next';

const ViewFile = () => {
    const iframeRef = useRef();
    const {t} = useTranslation(['label'])
    const [fileName, setFileName] = useQueryString('filename')
    const [fileId, setFileId] = useQueryString('fileId')
    const [page, setPage] = useQueryString('page')
    const [getFile, { data, isFetching }] = useLazyFetchDataQuery()

    const [url, setUrl] = useState()
    const token = localStorage.getItem("token");
    const urlForDoc = `${process.env.REACT_APP_API_BASE_URL}/ebs/getprojectdocument?fileId=${fileId}&token=${token}`
    const getPdf = () => {
      getFile({
        __config__: {
          url: '/applicationhelp/getfile',
          dataType: "dataUrl",
        },
        folderName: 'application-help',
        fileName: fileName
      })
    }

    useEffect(() => {
      document.title = fileName ? `${t("Help")}: ${page}` : `${t("File")}: ${page}`
    }, [fileName, page])

    useEffect(() => {
     !fileId && getPdf()
     fileId ? setUrl(urlForDoc) : setUrl(data)
    }, [fileId, urlForDoc, data])

    if(isFetching) {
      return <div>Loading...</div>
    }

    return (
    <div className="iframe-div">
      <iframe ref={iframeRef} className="iframe-div" src={url} />
    </div>)
}

export default ViewFile