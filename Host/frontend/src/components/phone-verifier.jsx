"use client";
import React from "react";



export default function Index() {
  return (const countryDialCodes = {
  US: "+1",
  CA: "+1",
  GB: "+44",
  FR: "+33",
  DE: "+49",
  IT: "+39",
  ES: "+34",
  AU: "+61",
  JP: "+81",
  BR: "+55",
  IN: "+91",
};

function MainComponent({ defaultCountry = "US" }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(defaultCountry);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCountryChange = (e) => {
    const newCountry = e.target.value;
    setSelectedCountry(newCountry);

    const strippedNumber = phoneNumber.replace(/^\+\d+\s*/, "");
    setPhoneNumber(`${countryDialCodes[newCountry]} ${strippedNumber}`);
  };

  const handlePhoneInput = (e) => {
    let input = e.target.value;
    if (!input.startsWith(countryDialCodes[selectedCountry])) {
      input = `${countryDialCodes[selectedCountry]} ${input.replace(/^\+/, "")}`;
    }
    setPhoneNumber(input);
  };

  const handleVerify = async () => {
    setIsVerifying(true);
    setError(null);
    setVerificationResult(null);

    try {
      const response = await fetch("/api/verify-phone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: phoneNumber.replace(/\s/g, ""),
          query: { default_country: selectedCountry },
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setVerificationResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsVerifying(false);
    }
  };

  useEffect(() => {
    if (!phoneNumber && countryDialCodes[selectedCountry]) {
      setPhoneNumber(`${countryDialCodes[selectedCountry]} `);
    }
  }, []);

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg">
      <h2 className="text-2xl font-inter font-bold text-gray-900 dark:text-white mb-6">
        Phone Number Verification
      </h2>

      <div className="space-y-4">
        <div className="flex gap-2">
          <select
            value={selectedCountry}
            onChange={handleCountryChange}
            className="w-24 p-2 border border-gray-200 rounded text-gray-900 dark:text-white dark:bg-gray-700"
          >
            {Object.keys(countryDialCodes).map((country) => (
              <option key={country} value={country}>
                {country} ({countryDialCodes[country]})
              </option>
            ))}
          </select>
          <input
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneInput}
            placeholder={`${countryDialCodes[selectedCountry]} number`}
            className="flex-1 p-2 border border-gray-200 rounded text-gray-900 dark:text-white dark:bg-gray-700"
          />
        </div>

        <button
          onClick={handleVerify}
          disabled={isVerifying || !phoneNumber.replace(/[\s+]/g, "")}
          className="w-full p-2 bg-gray-900 hover:bg-gray-700 text-white rounded font-inter disabled:opacity-50"
        >
          {isVerifying ? "Verifying..." : "Verify"}
        </button>

        {isVerifying && (
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded">
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          </div>
        )}

        {verificationResult && !error && (
          <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded">
            <div
              className={`flex items-center gap-2 ${
                verificationResult.status === "success"
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              <i
                className={`fas ${
                  verificationResult.status === "success"
                    ? "fa-check-circle"
                    : "fa-exclamation-circle"
                }`}
              ></i>
              <span className="font-medium">
                {verificationResult.phone_valid
                  ? "Valid Number"
                  : "Invalid Number"}
              </span>
            </div>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <p>
                <span className="font-medium">Carrier:</span>{" "}
                {verificationResult.carrier || "N/A"}
              </p>
              <p>
                <span className="font-medium">Country:</span>{" "}
                {verificationResult.country || "N/A"}
              </p>
              <p>
                <span className="font-medium">Type:</span>{" "}
                {verificationResult.phone_type || "N/A"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StoryComponent() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <MainComponent />
    </div>
  );
});
}