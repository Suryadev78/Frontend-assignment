import React, { useState } from "react";
import { Eye,EyeOff } from "lucide-react";
export interface InputFieldProps{
    value? :string;
    onChange? : (e:React.ChangeEvent<HTMLInputElement>) =>void;
    label?:string;
    placeholder?:string;
    helperText?:string;
    errorMessage?:string;
    disabled?:boolean;
    invalid?:boolean;
    type?: React.HTMLInputTypeAttribute;
    variant?:"filled" | "outlined" | "ghost";
    showPasswordToggle?:boolean;
    loading? : boolean;
    size?: "sm" | "md" | "lg";

}
const sizeClasses = {
    sm:"text-sm",
    md:"text-base",
    lg:"text-lg"
}
const variantClasses= {
    filled: "bg-gray-100 border-transparent focus:ring-2 focus:ring-blue-500",
    outlined: "border border-gray-400 focus:border-blue-500",
    ghost: "border-b border-gray-400 bg-transparent focus:border-blue-500",
}

export default function InputField({value,type = "text",showPasswordToggle,loading,onChange,label,placeholder,helperText,errorMessage,disabled,invalid,variant,size}:InputFieldProps){
    const inputSizeClass = sizeClasses[size || "md"];
    // const [loading,setLoading]  = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const inputType = showPasswordToggle && type === "password" ? showPassword ? "text" : "password" :type;
    
    return (
    <div className="flex items-center justify-center space-x-2 w-full">
        <label className="">{label}</label>
        {/* <div className=" flex"> */}

        <input type={inputType} className={ ` px-2 py-1 shadow-lg transition-all duration-200 border rounded ${variantClasses[variant || "outlined"]} ${inputSizeClass} ${invalid ? "border-red-500" : "border-gray-400"} ${disabled || loading ? "bg-gray-200 cursor-not-allowed" :"bg-white"}`}  value={value}  onChange={onChange} placeholder={placeholder} disabled={disabled || loading}  />
        {loading && (
  <div className="ml-2 animate-spin rounded-full border-2 border-gray-300 border-t-blue-500 w-4 h-4"></div>
)}

       {showPasswordToggle && type === "password" && (
           <button type="button" className="right-3 text-gray-500 hover:text-gray-700" onClick={()=>setShowPassword((prev) => !prev)}>{showPassword ? <EyeOff/>  : <Eye/>}</button>
        )}
            {/* </div> */}
        {invalid ? (
            <p className="text-sm text-red-500">{errorMessage}</p>
        ) : helperText ?  (<p className="text-sm text-gray-500">{helperText}</p>) : null}
    </div>
    )


}