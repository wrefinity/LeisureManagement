import otpGenerator from "otp-generator";

const generateOtp = () => {
    const otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
        digits: true,
        lowerCaseAlphabets: true
    });
    return otp;
}

export default generateOtp;