import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';
export const startShare = async (html:any, docName:string, action:any) => {
    let options = {
      html: html,
      fileName: docName,
      directory: 'Documents',
    };
    let file = await RNHTMLtoPDF.convert(options);
    console.log('file--', JSON.stringify(file));
    // const fileExists = await RNFS.exists(file.filePath);
    // if(!fileExists) {
    //   console.log('Filed does not exists');
    //   return;
    // }

    const shareOptions = {
      file: 'pdf',
      message: docName,
      url: `file://${file.filePath}`,
    }
    Share.open(shareOptions)
    .then((res) => {
      console.log(res);
      action();
    })
    .catch((err) => {
    //   dispatch(clearMoneyReceiptHtmlDocument());
        action();
      console.log(err);
    });
  }

  export const debounce = (func:any, delay:number) => {
    let timerId:any;
    return (...args:any) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        func(args);
      }, delay);
    };
  }