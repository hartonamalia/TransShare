import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSignup } from "../../hooks/useSignUp";
import registerImage from "../../assets/register.jpg";

export default function SignUpForm({ setAuthState }) {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { signup, error, isLoading } = useSignup();

  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    prefix: "",
    restPhoneNumber: "",
  });

  const handleLogin = () => {
    navigate("/login");
  };
  const handleTermsCheckboxChange = () => {
    setErrorMessage("");
    setTermsAccepted(!termsAccepted);
  };
  const handleSignUpClick = async () => {
    if (!termsAccepted) {
      setErrorMessage("You must accept the terms and conditions to continue.");
      return;
    }
    const { firstName, lastName, email, password, confirmPassword, prefix, restPhoneNumber } =
      data;
    if (
      firstName === "" ||
      lastName === "" ||
      password === "" ||
      prefix === "" ||
      confirmPassword === "" ||
      email === "" ||
      restPhoneNumber === ""
    ) {
      toast.error("Please complete all the fields.");
      return;
    }
    if(password !== confirmPassword){
      toast.error("Passwords must be the same.");
      return;
      
    }
    await signup(firstName, lastName, email, password, prefix, restPhoneNumber);
  };

  return (
    <div className="flex flex-wrap justify-center items-center">
      {/* Container pentru formular */}
      <div className="w-full md:w-1/2 px-4">
        <div className=" mt-3 ml-4 w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100">
          <div className="text-center">
            <h1 className="text-5xl font-semibold">Create an Account</h1>
            <p className="font-medium text-lg text-gray-500 mt-4">
              Please enter your details.
            </p>
          </div>
          <div className="mt-8">
            <div className="flex flex-col">
              <label className="text-lg font-medium">First Name</label>
              <input
                value={data.firstName}
                //onChange={(e) => setFirstName(e.target.value)}
                onChange={(e) =>
                  setData({ ...data, firstName: e.target.value })
                }
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Enter your first name"
              />
            </div>
            <div className="flex flex-col mt-4">
              <label className="text-lg font-medium">Last Name</label>
              <input
                value={data.lastName}
                //onChange={(e) => setLastName(e.target.value)}
                onChange={(e) => setData({ ...data, lastName: e.target.value })}
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Enter your last name"
              />
            </div>
            <div className="flex flex-col mt-4">
              <label className="text-lg font-medium">Email</label>
              <input
                value={data.email}
                //onChange={(e) => setEmail(e.target.value)}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Enter your email"
              />
            </div>
            <div className="flex flex-col mt-4">
              <label className="text-lg font-medium">Password</label>
              <input
                value={data.password}
                //onChange={(e) => setPassword(e.target.value)}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Enter your password"
                type={"password"}
              />
              <div className="flex flex-col mt-4">
                <label className="text-lg font-medium">Confirm Password</label>
                <input
                  value={data.confirmPassword}
                  onChange={(e) =>
                    setData({ ...data, confirmPassword: e.target.value })
                  }
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  placeholder="Confirm your password"
                  type="password"
                />
              </div>
              {data.password !== data.confirmPassword &&
                data.confirmPassword !== "" && (
                  <p className="text-red-500 mt-2">Passwords do not match.</p>
                )}
            </div>
            <div className="flex flex-col mt-4">
              <label className="text-lg font-medium">Phone Number</label>
              <div className="flex items-center mt-2">
                <select
                  value={data.prefix}
                  //onChange={handlePrefixChange}
                  onChange={(e) => setData({ ...data, prefix: e.target.value })}
                  className="border-2 border-gray-100 rounded-l-xl p-4 bg-transparent w-1/3"
                >
                  <option value="">Select Prefix</option>\
                  <option value="+93">Afghanistan (+93)</option>
                  <option value="+355">Albania (+355)</option>
                  <option value="+213">Algeria (+213)</option>
                  <option value="+376">Andorra (+376)</option>
                  <option value="+244">Angola (+244)</option>
                  <option value="+54">Argentina (+54)</option>
                  <option value="+374">Armenia (+374)</option>
                  <option value="+61">Australia (+61)</option>
                  <option value="+43">Austria (+43)</option>
                  <option value="+994">Azerbaijan (+994)</option>
                  <option value="+1-242">Bahamas (+1-242)</option>
                  <option value="+973">Bahrain (+973)</option>
                  <option value="+880">Bangladesh (+880)</option>
                  <option value="+1-246">Barbados (+1-246)</option>
                  <option value="+375">Belarus (+375)</option>
                  <option value="+32">Belgium (+32)</option>
                  <option value="+501">Belize (+501)</option>
                  <option value="+229">Benin (+229)</option>
                  <option value="+975">Bhutan (+975)</option>
                  <option value="+591">Bolivia (+591)</option>
                  <option value="+387">Bosnia and Herzegovina (+387)</option>
                  <option value="+267">Botswana (+267)</option>
                  <option value="+55">Brazil (+55)</option>
                  <option value="+673">Brunei (+673)</option>
                  <option value="+359">Bulgaria (+359)</option>
                  <option value="+226">Burkina Faso (+226)</option>
                  <option value="+257">Burundi (+257)</option>
                  <option value="+855">Cambodia (+855)</option>
                  <option value="+237">Cameroon (+237)</option>
                  <option value="+1">Canada (+1)</option>
                  <option value="+238">Cape Verde (+238)</option>
                  <option value="+236">Central African Republic (+236)</option>
                  <option value="+235">Chad (+235)</option>
                  <option value="+56">Chile (+56)</option>
                  <option value="+86">China (+86)</option>
                  <option value="+57">Colombia (+57)</option>
                  <option value="+269">Comoros (+269)</option>
                  <option value="+506">Costa Rica (+506)</option>
                  <option value="+385">Croatia (+385)</option>
                  <option value="+53">Cuba (+53)</option>
                  <option value="+357">Cyprus (+357)</option>
                  <option value="+420">Czech Republic (+420)</option>
                  <option value="+45">Denmark (+45)</option>
                  <option value="+253">Djibouti (+253)</option>
                  <option value="+1-809">Dominican Republic (+1-809)</option>
                  <option value="+593">Ecuador (+593)</option>
                  <option value="+20">Egypt (+20)</option>
                  <option value="+503">El Salvador (+503)</option>
                  <option value="+240">Equatorial Guinea (+240)</option>
                  <option value="+291">Eritrea (+291)</option>
                  <option value="+372">Estonia (+372)</option>
                  <option value="+251">Ethiopia (+251)</option>
                  <option value="+679">Fiji (+679)</option>
                  <option value="+358">Finland (+358)</option>
                  <option value="+33">France (+33)</option>
                  <option value="+241">Gabon (+241)</option>
                  <option value="+220">Gambia (+220)</option>
                  <option value="+995">Georgia (+995)</option>
                  <option value="+49">Germany (+49)</option>
                  <option value="+233">Ghana (+233)</option>
                  <option value="+30">Greece (+30)</option>
                  <option value="+1-473">Grenada (+1-473)</option>
                  <option value="+502">Guatemala (+502)</option>
                  <option value="+224">Guinea (+224)</option>
                  <option value="+592">Guyana (+592)</option>
                  <option value="+36">Hungary (+36)</option>
                  <option value="+354">Iceland (+354)</option>
                  <option value="+91">India (+91)</option>
                  <option value="+62">Indonesia (+62)</option>
                  <option value="+98">Iran (+98)</option>
                  <option value="+964">Iraq (+964)</option>
                  <option value="+353">Ireland (+353)</option>
                  <option value="+972">Israel (+972)</option>
                  <option value="+39">Italy (+39)</option>
                  <option value="+1-876">Jamaica (+1-876)</option>
                  <option value="+81">Japan (+81)</option>
                  <option value="+962">Jordan (+962)</option>
                  <option value="+7">Kazakhstan (+7)</option>
                  <option value="+254">Kenya (+254)</option>
                  <option value="+686">Kiribati (+686)</option>
                  <option value="+383">Kosovo (+383)</option>
                  <option value="+965">Kuwait (+965)</option>
                  <option value="+996">Kyrgyzstan (+996)</option>
                  <option value="+231">Liberia (+231)</option>
                  <option value="+218">Libya (+218)</option>
                  <option value="+423">Liechtenstein (+423)</option>
                  <option value="+370">Lithuania (+370)</option>
                  <option value="+352">Luxembourg (+352)</option>
                  <option value="+389">Macedonia (+389)</option>
                  <option value="+261">Madagascar (+261)</option>
                  <option value="+265">Malawi (+265)</option>
                  <option value="+60">Malaysia (+60)</option>
                  <option value="+356">Malta (+356)</option>
                  <option value="+52">Mexico (+52)</option>
                  <option value="+373">Moldova (+373)</option>
                  <option value="+377">Monaco (+377)</option>
                  <option value="+976">Mongolia (+976)</option>
                  <option value="+382">Montenegro (+382)</option>
                  <option value="+212">Morocco (+212)</option>
                  <option value="+264">Namibia (+264)</option>
                  <option value="+674">Nauru (+674)</option>
                  <option value="+977">Nepal (+977)</option>
                  <option value="+31">Netherlands (+31)</option>
                  <option value="+64">New Zealand (+64)</option>
                  <option value="+505">Nicaragua (+505)</option>
                  <option value="+227">Niger (+227)</option>
                  <option value="+234">Nigeria (+234)</option>
                  <option value="+47">Norway (+47)</option>
                  <option value="+968">Oman (+968)</option>
                  <option value="+92">Pakistan (+92)</option>
                  <option value="+970">Palestine (+970)</option>
                  <option value="+595">Paraguay (+595)</option>
                  <option value="+51">Peru (+51)</option>
                  <option value="+63">Philippines (+63)</option>
                  <option value="+48">Poland (+48)</option>
                  <option value="+351">Portugal (+351)</option>
                  <option value="+974">Qatar (+974)</option>
                  <option value="+40">Romania (+40)</option>
                  <option value="+7">Russia (+7)</option>
                  <option value="+250">Rwanda (+250)</option>
                  <option value="+685">Samoa (+685)</option>
                  <option value="+378">San Marino (+378)</option>
                  <option value="+966">Saudi Arabia (+966)</option>
                  <option value="+221">Senegal (+221)</option>
                  <option value="+381">Serbia (+381)</option>
                  <option value="+232">Sierra Leone (+232)</option>
                  <option value="+65">Singapore (+65)</option>
                  <option value="+421">Slovakia (+421)</option>
                  <option value="+386">Slovenia (+386)</option>
                  <option value="+27">South Africa (+27)</option>
                  <option value="+211">South Sudan (+211)</option>
                  <option value="+34">Spain (+34)</option>
                  <option value="+94">Sri Lanka (+94)</option>
                  <option value="+249">Sudan (+249)</option>
                  <option value="+268">Swaziland (+268)</option>
                  <option value="+46">Sweden (+46)</option>
                  <option value="+41">Switzerland (+41)</option>
                  <option value="+963">Syria (+963)</option>
                  <option value="+886">Taiwan (+886)</option>
                  <option value="+992">Tajikistan (+992)</option>
                  <option value="+255">Tanzania (+255)</option>
                  <option value="+66">Thailand (+66)</option>
                  <option value="+216">Tunisia (+216)</option>
                  <option value="+90">Turkey (+90)</option>
                  <option value="+993">Turkmenistan (+993)</option>
                  <option value="+688">Tuvalu (+688)</option>
                  <option value="+256">Uganda (+256)</option>
                  <option value="+380">Ukraine (+380)</option>
                  <option value="+971">United Arab Emirates (+971)</option>
                  <option value="+44">UK (+44)</option>
                  <option value="+1">USA (+1)</option>
                  <option value="+598">Uruguay (+598)</option>
                  <option value="+998">Uzbekistan (+998)</option>
                  <option value="+678">Vanuatu (+678)</option>
                  <option value="+58">Venezuela (+58)</option>
                  <option value="+84">Vietnam (+84)</option>
                  <option value="+967">Yemen (+967)</option>
                  <option value="+260">Zambia (+260)</option>
                  <option value="+263">Zimbabwe (+263)</option>
                </select>
                <input
                  value={data.restPhoneNumber}
                  //onChange={(e) =>
                  //setRestPhoneNumber(e.target.value.replace(/\D/, ""))
                  onChange={(e) =>
                    setData({ ...data, restPhoneNumber: e.target.value })
                  }
                  //}
                  className="border-2 border-gray-100 rounded-r-xl p-4 bg-transparent flex-1 ml-1" 
                  placeholder="Rest of phone number"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <div>
                <input
                  type="checkbox"
                  id="terms"
                  checked={termsAccepted}
                  onChange={handleTermsCheckboxChange}
                />
                <label className="ml-2 font-medium text-base" htmlFor="terms">
                I accept the terms of data processing
                </label>
              </div>
              {/* <button className="font-medium text-base text-violet-500">
                View terms and conditions
              </button> */}
            </div>
            {errorMessage && (
              <p className="text-red-500 mt-2">{errorMessage}</p>
            )}
            <div className="mt-8 flex flex-col gap-y-4">
              <button
                className={`active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-lg ${
                  !termsAccepted ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handleSignUpClick}
                disabled={!termsAccepted}
              >
                Sign Up
              </button>
            </div>
            <div className="mt-8 flex justify-center items-center">
              <p className="font-medium text-base">Already have an account?</p>
              <button
                onClick={() => handleLogin()}
                className="ml-2 font-medium text-base text-violet-500"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Container pentru imagine */}
      <div className="hidden md:block w-full md:w-1/2 p-4">
        {/* Imaginea */}
        <img
          src={registerImage}
          alt="Register"
          className="w-full h-auto rounded-lg shadow-md mt-[-200px]"
        />
      </div>
    </div>
  );
}
