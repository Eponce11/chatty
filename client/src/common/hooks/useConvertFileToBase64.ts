const useConvertFileToBase64 = async (file: any): Promise<any> => {
  return new Promise ((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result)
    }
    fileReader.onerror = (error) => {
      reject(error);
    }
  })
};

export default useConvertFileToBase64;