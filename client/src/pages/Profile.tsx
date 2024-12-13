import { useEffect, useState } from "react";
import SkillsProfile from "../components/Profile/SkillsProfile";
import AttachmentsProfile from "../components/Profile/AttachmentsProfile";
import WorkExperienceProfile from "../components/Profile/WorkExperienceProfile";
import EducationProfile from "../components/Profile/EducationProfile";
import AddressProfile from "../components/Profile/AddressProfile";
import { useUploadProfileMutation } from "../redux/cloudinaryApi";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Payload, User } from "../types";
import {
  useFetchProfileMutation,
  useUpdateProfileImageMutation,
  useUpdateProfileMutation,
} from "../redux/meetApi";
import NameProfile from "../components/Profile/NameProfile";
import EmailProfile from "../components/Profile/EmailProfile";
import PhoneNumberProfile from "../components/Profile/PhoneNumberProfile";
import AboutProfile from "../components/Profile/AboutProfile";

export default function Profile() {
  const [uploadProfile] = useUploadProfileMutation();
  const [updateUrl] = useUpdateProfileImageMutation();
  const [preview, setPreview] = useState<string>("/profile.jpg");
  const [disable, setDisable] = useState<boolean>(true);
  const { username } = useParams<{ username: string }>();
  const [fetchProfileData] = useFetchProfileMutation();
  const [patchProfile] = useUpdateProfileMutation();
  const [profileData, setProfileData] = useState<User>();
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
    checkUpdateFeature();
    const getProfile = async () => {
      const response = await fetchProfileData({
        username: username as string,
      }).unwrap();
      setPreview(response.data.profileImg || "/profile.jpg");
      setProfileData(response.data);
    };
    getProfile();
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
    const response = await uploadProfile({ formData: formdata }).unwrap();
    const res = await fetch(
      `http://localhost:3000/image/${username}?url=${response.data + ""}`,
      {
        method: "PATCH",
      }
    );
    const result = await res.json();
    if (response.success) setPreview(response.data as string);
  };
  const updateProfile = async (body: User) => {
    await patchProfile({
      username: username + "",
      body,
    }).unwrap();
  };
  return (
    <div className="mx-auto border-b shadow-md rounded-md max-w-4xl p-4 my-6">
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
            src={`${preview}`}
            className="z-10 h-28 w-28 bg-cover"
            onClick={() => setImage()}
          ></img>
        </div>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <NameProfile data={profileData?.name} updateProfile={updateProfile} />
          <EmailProfile data={profileData?.email} />
          <PhoneNumberProfile
            data={profileData?.phoneNumber}
            updateProfile={updateProfile}
          />
          <AboutProfile
            data={profileData?.about}
            updateProfile={updateProfile}
          />
          <AddressProfile disable={disable} username={username + ""} />
          <EducationProfile disable={disable} username={username + ""} />
          <SkillsProfile disable={disable} username={username + ""} />
          <WorkExperienceProfile disable={disable} username={username + ""} />
          {/* <AttachmentsProfile disable={disable} /> */}
        </dl>
      </div>
    </div>
  );
}
