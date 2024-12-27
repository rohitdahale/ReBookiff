import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getPost } from "../../actions/postActions";
import { useState } from "react";
import "./PostDetails.css";
import {WhatsappShareButton} from 'react-share'
import {LineShareButton} from 'react-share'
import {
  Button,
  Card,
  CircularProgress,
  IconButton,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { addConversation } from "../../api/post";
import ShareIcon from '@mui/icons-material/Share';
import SubjectTable from "./SubjectTable";

const PostDetails = () => {
  const { post } = useSelector((state) => state.posts);
  const user = JSON.parse(localStorage?.getItem("profile"));
  const userId = user?.user?._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [mainImage, setMainImage] = useState(post?.books_stack);
  const allImages = [
    post?.books_stack,
    post?.book1_img,
    post?.book2_img,
    post?.book3_img,
    post?.book4_img,
    post?.book5_img,
  ];
  const allNonNullImages = allImages?.filter((image) => image !== "");
  const isCreator = user?.user?._id === post?.creator;

  const hrefLink = `https://wa.me/${post?.whatsapp_number}`;

  useEffect(() => {
    const gettingPost = () => {
      dispatch(getPost(id));
      window.scrollTo(0, 0);
    };
    gettingPost();
  }, [dispatch, id]);

  useEffect(() => {
    setMainImage(post?.books_stack);
  }, [post]);

  if (!post) {
    return (
      <div style={{ height: "100vh", width: "100%", margin: "25vh 90vh" }}>
        <CircularProgress color="inherit" size="5em" />
      </div>
    );
  }

  const addConvo = async () => {
    await addConversation(userId, post?.creator);
    navigate("/chat");
  };

  const createData = (sr_num, book_name, book_pub, book_img) => {
    return { sr_num, book_name, book_pub, book_img };
  };

  const rows = [1, 2, 3, 4, 5].map((bookNumber) => {
    return createData(
      bookNumber,
      post[`book${bookNumber}`],
      post[`book${bookNumber}_pub`],
      post[`book${bookNumber}_img`]
    );
  });

  return (
    <div className="main_container" style={{ display: "flex" }}>
      <div className="left-container">
        <Card
          elevation={3}
          className="image_menu"
          sx={{
            backgroundColor: "#fcda71",
            // height: "65%",
            m: 2,
            ml: 8,
            px: 1.7,
            py: 3,
            alignContent: "center",
          }}
          // class="booksDisplayCard"
        >
          <img
            src={mainImage}
            alt="Main Image"
            className="main-image"
            style={{ p: 3 }}
          />
          <div className="image_section">
            {allNonNullImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Image ${index}`}
                className="image"
                onClick={() => setMainImage(image)}
              />
            ))}
          </div>
        </Card>
        {!isCreator && (
          <div className="page_details_buttons">
          <Tooltip title={!user?.token ? "Please sign in to use these functionalities" : ""}>
            <Paper
              sx={{
                backgroundColor: "#FEE795",
                p: "20px",
                ml: 4,
                mr: 2,
                mt: 5,
                position: "relative",
              }}
              elevation={3}
            >
              <Button
                variant="contained"
                onClick={addConvo}
                disabled={!user?.token}
                sx={{
                  ":hover": { backgroundColor: "#F9C810" },
                  marginX: "2rem",
                  backgroundColor: !user?.token ? "#f2f2f2" : "#F9C810",
                  color: "black",
                  zIndex:3
                }}
              >
                Chat with seller
              </Button>
              <Button
                target="blank"
                href={hrefLink}
                variant="contained"
                disabled={!user?.token || !post?.whatsapp_number}
                sx={{
                  ":hover": { backgroundColor: "#F9C810" },
                  backgroundColor: !user?.token ? "#f2f2f2" : "#F9C810",
                  color: "black",
                  zIndex:3
                }}
              >
                Connect on Whatsapp
              </Button>
              <div
                className="inner_border"
              ></div>
            </Paper>
            </Tooltip>
          </div>
        )}
      </div>

      <Paper
        elevation={3}
        sx={{
          backgroundColor: "#fcda71",
          m: 2,
          ml: 8,
          px: 5,
          py: 2,
          width: "47%",
        }}
      >
        <div className="titleLine">
        <Typography
          gutterBottom
          variant="h4"
          component="div"
          sx={{ fontFamily: "Merriweather", fontWeight: "bold"}}
        >
          {post.year +
            " " +
            post.branch +
            " " +
            post.semester.toUpperCase() +
            " SEM "}
            
        </Typography>
        <IconButton className="shareButton">      
              <WhatsappShareButton url={window.location.href} image={post?.books_stack}  title="Check out this Amazing Book Set for Sale!!!" ><ShareIcon sx={{color:'black'}}/></WhatsappShareButton>
            </IconButton>
        </div>
        

        <SubjectTable rows={rows} setMainImage={setMainImage} />

        <TableContainer
          component={Paper}
          sx={{ backgroundColor: "#fff5d1", mt: 1 }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Original Price</TableCell>
                <TableCell align="center">Resale Price</TableCell>
                <TableCell align="center">Seller</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableCell align="center">
                <span>&#8377;</span> {post?.original_price}
              </TableCell>
              <TableCell align="center">
                <span>&#8377;</span> {post?.resale_price}
                {post?.fix_nego && ` (${post?.fix_nego})`}
              </TableCell>
              <TableCell align="center">{post?.seller_name}</TableCell>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

/*
college: String,
  year : String,
  branch : String,
  semester : String,
  original_price:String,
  resale_price:String,
  // contact_number : String,
  books_stack:String,
  book1 : String,
  book2 : String,
  book3 : String,
  book4 : String,
  book5 : String,
  book1_pub:String,
  book2_pub:String,
  book3_pub:String,
  book4_pub:String,
  book5_pub:String,
  book1_img : String,
  book2_img : String,
  book3_img : String,
  book4_img : String,
  book5_img : String,
  creator : String,
*/

export default PostDetails;
