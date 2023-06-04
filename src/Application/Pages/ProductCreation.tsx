import { Fragment, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import AWS from 'aws-sdk';
import { getDiscountPrice } from "../Components/productHelper";
import SEO from "./SEO";
import Header from "../Components/header/layout";
import { refreshAccessToken } from "../Components/refresher";

AWS.config.update({
  region: 'ap-southeast-1', // Replace with your AWS region
  accessKeyId: 'AKIA6CIR6AWO6WY3SL3X', // Replace with your AWS access key
  secretAccessKey: 'OXXAQ0Bkw59yIaIOh9sFA2AOcBKto//dwFtq8Jb0' // Replace with your AWS secret access key
});

const s3 = new AWS.S3();

const ProductCreation = () => {
  let cartTotalPrice = 0;
  
    let { pathname } = useLocation();
    const currency = useSelector((state: any) => state.currency);
    const { cartItems } = useSelector((state) => state.cart);
    const [uploadedPictures, setUploadedPictures] = useState([]);
    let image = []
    const [description, setDescription] = useState("");
    const [addInfo, setAddInfo] = useState("");
    const [categories, setCategories] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [name, setName] = useState("");
  
    const handlePictureUpload = (event) => {
      const files = event.target.files;
      if (files && files.length > 0) {
        const picturesArray = Array.from(files).slice(0, 1); // Limit to 5 pictures
        const uploadedPicturesCopy = [...uploadedPictures];
  
        picturesArray.forEach((file) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const base64Image = e.target.result;
            uploadedPicturesCopy.push(base64Image);
            setUploadedPictures(uploadedPicturesCopy);
          };
          reader.readAsDataURL(file);
        });
      }
    };
  
    const handlePictureUploadToS3 = (file) => {
        return new Promise((resolve, reject) => {
          const fileName = `${Date.now()}_${file.name}`;
      
          const params = {
            Bucket: 'phasionista-products', // Replace with your actual bucket name
            Key: fileName,
            ContentType: file.type,
            Body: file,
            ACL: 'public-read'
          };
      
          s3.upload(params, (error, response) => {
            if (error) {
              console.error('Error uploading picture to AWS S3:', error);
              reject(error);
            } else {
              const imageUrl = response.Location;
              console.log(`Picture ${fileName} uploaded successfully to AWS S3. Image URL: ${imageUrl}`);
              image.push(imageUrl);
              resolve(imageUrl);
            }
          });
        });
      };
      
      const handleUploadButtonClick = async () => {
        const uploadPromises = uploadedPictures.map((base64Image) => {
          const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
          const decodedData = atob(base64Data);
          const uint8Array = new Uint8Array(decodedData.length);
          for (let i = 0; i < decodedData.length; ++i) {
            uint8Array[i] = decodedData.charCodeAt(i);
          }
          const file = new Blob([uint8Array], { type: 'image/jpeg' });
          return handlePictureUploadToS3(file);
        });
      
        try {
          const results = await Promise.allSettled(uploadPromises);
          const uploadedImageUrls = results
            .filter((result) => result.status === 'fulfilled')
            .map((result) => result.value);
            
          if (uploadedImageUrls.length > 0) {
            console.log('All pictures uploaded to AWS S3.');
            setTimeout(() => {
                createRetailer();
              }, 1000); 
          } else {
            console.error('Error uploading pictures to AWS S3');
          }
        } catch (error) {
          console.error('Error uploading pictures to AWS S3:', error);
        }
      };

      const [userRid, setUserRid] = useState("")
      const fetchuserProfileData = async () => {
        const cookies = document.cookie; 

        const match = cookies.match(/access-token=([^;]+)/);

        let accessToken = null;
        if (match) {
          accessToken = match[1]; // Extract the cookie value

          if(accessToken == ""){
            await refreshAccessToken()
            accessToken = cookies.match(/access-token=([^;]+)/)[1];
          }
        }
    
        try {
          const response = await fetch(`http://localhost:3016/user/getbyid`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`
            }
          });
    
          if (response.ok) {
            const jsonData = await response.json();
            setUserRid(jsonData);
          }

          else {
            refreshAccessToken()
            window.location.reload()
          }
    
        } catch (error) {
          // Handle the exception
        }
      };

    const createRetailer = async () => {
        const cookies = document.cookie; 

        const match = cookies.match(/access-token=([^;]+)/);
      
        let accessToken = null;
        if (match) {
          accessToken = match[1]; // Extract the cookie value
      
          if(accessToken == ""){
            await refreshAccessToken()
            accessToken = cookies.match(/access-token=([^;]+)/)[1];
          }
        }
        
        try {
          const response = await fetch('http://localhost:3014/product/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'sec': 't21r123redfafa341121431dfa'
            },
            body: JSON.stringify({
                "retailer_id": userRid.retailer_id,
                "name": name,
                "stock": quantity,
                "saleCount": 0,
                "category": "fashion, " + categories,
                "shortDescription": addInfo,
                "fullDescription": description,
                "price": price,
            })
          });
      
          if (response.ok) {
            const bodyId = await response.json().then()

            const imagePromises = image.map(async (images) => {
              const response2 = await fetch(`http://localhost:3014/product/images/${bodyId.id}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'sec': 't21r123redfafa341121431dfa'
                },
                body: JSON.stringify({
                  "image": images
                })
              });
      
              if (response2.ok) {
                const bodyId = await response2.json();
                console.log(bodyId);
                window.location.href='/library'
              }
            }
            );
          }
           else {
            // Handle error case
            refreshAccessToken()
            window.location.reload()
          }
        } catch (error) {
          // Handle exception
        }
  
      };

  useEffect(
    () => {
      fetchuserProfileData();
    }
  , []
  )

  return (
    <Fragment>
      <SEO
        titleTemplate="Checkout"
        description="Checkout page of Phasionista"
      />
      <Header headerTop="visible">
        <div className="checkout-area pt-95 pb-100">
          <div className="container">
              <div className="row">
                <div className="col-lg-7">
                  <div className="billing-info-wrap">
                    <h3>Product Details</h3>
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Product Name</label>
                          <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Quantity</label>
                          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Price</label>
                          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)}/>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Categories</label>
                          <input
                            placeholder="Category1, Category2, etc"
                            type="text"
                            value={categories}
                            onChange={(e) => setCategories(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="additional-info-wrap">
                      <h4>Additional info</h4>
                      <div className="additional-info">
                        <textarea
                          placeholder="Additional information on your product e.g. sizes available and measurements."
                          name="message"
                          defaultValue={""}
                          value={addInfo}
                          onChange={(e) => {setAddInfo(e.target.value)}}
                        />
                      </div>
                    </div>

                    <div className="additional-info-wrap">
                      <h4>Description</h4>
                      <div className="additional-info">
                        <textarea
                          placeholder="Describe your product."
                          name="message"
                          defaultValue={""}
                          value={description}
                          onChange={(e) => {setDescription(e.target.value)}}
                        />
                      </div>
                    </div>
                  </div>

                  {uploadedPictures.length > 0 && (
                    <div>
                        <h4>Uploaded Pictures:</h4>
                        <div>
                        {uploadedPictures.map((picture, index) => (
                            <img key={index} src={picture} alt={`Uploaded Picture ${index + 1}`} />
                        ))}
                        </div>
                    </div>
                    )}
                </div>
                <div className="col-lg-5">
                <div className="your-order-area">
                    <h3>Pictures</h3>
                    <div className="place-order mt-25">
                    <input type="file" accept="image/*" multiple onChange={handlePictureUpload} />
                    <button className="btn-hover" onClick={handleUploadButtonClick}>
                        <span className="icon-cloud-upload"></span> Create Product
                    </button>
                    </div>
                </div>
                </div>
              </div>
          </div>
        </div>
      </Header>
    </Fragment>
  );
};

export default ProductCreation;
