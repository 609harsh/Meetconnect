import { useEffect, useState } from "react";
import SkillsProfile from "../components/Profile/SkillsProfile";
import WorkExperienceProfile from "../components/Profile/WorkExperienceProfile";
import EducationProfile from "../components/Profile/EducationProfile";
import AddressProfile from "../components/Profile/AddressProfile";
import { useUploadProfileMutation } from "../redux/ApiSlice/cloudinaryApi";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Payload, User } from "../types";
import {
  // useUpdateProfileImageMutation,
  useUpdateProfileMutation,
} from "../redux/ApiSlice/meetApi";
import NameProfile from "../components/Profile/NameProfile";
import EmailProfile from "../components/Profile/EmailProfile";
import PhoneNumberProfile from "../components/Profile/PhoneNumberProfile";
import AboutProfile from "../components/Profile/AboutProfile";
import { useFetchProfileQuery } from "../redux/ApiSlice/publicApi";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
const base_url = import.meta.env.VITE_API_HOST + "";
export default function Profile() {
  const [uploadProfile] = useUploadProfileMutation();
  // const [updateUrl] = useUpdateProfileImageMutation();
  const [preview, setPreview] = useState<string>("");
  const [disable, setDisable] = useState<boolean>(true);
  const { username } = useParams<{ username: string }>();
  const { data: profileData, error } = useFetchProfileQuery({
    username: username as string,
  });
  const [patchProfile] = useUpdateProfileMutation();
  // const [profileData, setProfileData] = useState<User>();
  const navigation = useNavigate();

  const checkUpdateFeature = () => {
    const token = localStorage.getItem("token") as string;
    if (!token || token.trim() === "") {
      return;
    }
    const payload = jwtDecode(token) as Payload;
    if (username === payload.username) {
      setDisable(false);
      return;
    }
  };

  useEffect(() => {
    if (error) {
      toast.error("No User Exists");
      navigation("/dashboard");
    }
  }, [error]);
  useEffect(() => {
    checkUpdateFeature();
  }, []);

  const setImage = () => {
    document.getElementById("fileInput")?.click();
  };

  const getFile = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );
    formdata.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY);

    try {
      const response = await toast.promise(
        uploadProfile({ formData: formdata }).unwrap(),
        { pending: "Uploading" }
      );
      const res = await toast.promise(
        fetch(`${base_url}image?url=${response.data + ""}`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }),
        {
          pending: "Uploading",
          success: "Uploaded",
        }
      );
      await res.json();
      if (response.success) setPreview(response.data as string);
    } catch (error: any) {
      toast.error(error.message);
    }
    // await updateUrl({ url: response.data as string }).unwrap();
  };
  const updateProfile = async (body: User) => {
    try {
      await patchProfile({
        body,
      }).unwrap();
    } catch (err: any) {
      if (err.status === 401) {
        navigation("/login");
        return;
      }
      toast.error(err.error);
    }
  };
  return (
    <div
      style={{ backgroundImage: "url(/profileB2.jpg)" }}
      className="bg-no-repeat bg-center pb-2"
    >
      <Navbar />
      <div className="mx-auto border-b shadow-md rounded-md max-w-4xl p-4 my-6 bg-gray-100">
        <div className="px-4 sm:px-0 flex justify-between items-center">
          <h3 className="text-3xl font-semibold leading-7 text-gray-900 ">
            Your Profile
          </h3>
          <div className="relative border-2 border-solid border-black w-fit mr-4">
            <input
              type="file"
              className="hidden"
              id="fileInput"
              accept="image/png, image/jpeg, image/jpg"
              onChange={getFile}
            />
            <img
              src={
                preview
                  ? preview
                  : profileData?.data.profileImg ?? "/profile.jpg"
              }
              className="z-10 h-28 w-28 bg-cover"
              onClick={() => setImage()}
            ></img>
          </div>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <NameProfile
              data={profileData?.data?.name}
              updateProfile={updateProfile}
              disable={disable}
            />
            <EmailProfile data={profileData?.data?.email} />
            <PhoneNumberProfile
              data={profileData?.data?.phoneNumber}
              updateProfile={updateProfile}
              disable={disable}
            />
            <AboutProfile
              data={profileData?.data?.about}
              updateProfile={updateProfile}
              disable={disable}
            />
            <AddressProfile disable={disable} username={username + ""} />
            <EducationProfile disable={disable} username={username + ""} />
            <SkillsProfile disable={disable} username={username + ""} />
            <WorkExperienceProfile disable={disable} username={username + ""} />
            {/* <AttachmentsProfile /> */}
          </dl>
        </div>
      </div>
    </div>
  );
}
