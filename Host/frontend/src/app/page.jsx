"use client";
import { useState, useEffect, useCallback } from "react";


function MainComponent() {
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [message, setMessage] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPhoneNumbers = async () => {
      try {
        const response = await fetch('http://localhost:4000/getUsers');
        if (!response.ok) {
          throw new Error('Failed to fetch phone numbers');
        }
        const data = await response.json();
        setPhoneNumbers(data.map(user => user.phone));
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load phone numbers');
        setIsLoading(false);
      }
    };

    fetchPhoneNumbers();
  }, []);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedNumbers(phoneNumbers);
    } else {
      setSelectedNumbers([]);
    }
  };

  const handleNumberSelect = (number) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter((n) => n !== number));
    } else {
      setSelectedNumbers([...selectedNumbers, number]);
    }
  };

  const handleSend = async () => {
    if (!message.trim()) {
      setError("Please enter a message");
      return;
    }
    if (!companyName.trim()) {
      setError("Please enter a company name");
      return;
    }
    if (selectedNumbers.length === 0) {
      setError("Please select at least one phone number");
      return;
    }

    setIsSending(true);
    setError("");

    try {
      const response = await fetch("http://localhost:4000/sendMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumbers: selectedNumbers,
          message,
          companyName,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send messages");
      }

      setMessage("");
      setSelectedNumbers([]);
      setCompanyName("");
    } catch (err) {
      setError("Failed to send messages. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl p-6">
        <h2 className="text-2xl font-inter font-bold text-gray-900 dark:text-white mb-6">
          Message Manager
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Company Name
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full p-2 border border-gray-200 rounded text-gray-900 dark:text-white dark:bg-gray-700"
              placeholder="Enter company name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 border border-gray-200 rounded text-gray-900 dark:text-white dark:bg-gray-700 h-32"
              placeholder="Type your message here..."
            />
          </div>

          <div>
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={selectedNumbers.length === phoneNumbers.length}
                onChange={handleSelectAll}
                className="mr-2"
              />
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Select All Numbers
              </label>
            </div>

            <div className="max-h-48 overflow-y-auto border border-gray-200 rounded p-2">
              {isLoading ? (
                <div className="flex items-center justify-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 dark:border-white"></div>
                </div>
              ) : phoneNumbers.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">No phone numbers available</p>
              ) : (
                phoneNumbers.map((number, index) => (
                  <div key={index} className="flex items-center py-1">
                    <input
                      type="checkbox"
                      checked={selectedNumbers.includes(number)}
                      onChange={() => handleNumberSelect(number)}
                      className="mr-2"
                    />
                    <span className="text-gray-700 dark:text-gray-300">
                      {number}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded">
              <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
            </div>
          )}

          <button
            onClick={handleSend}
            disabled={isSending}
            className="w-full p-2 bg-gray-900 hover:bg-gray-700 text-white rounded font-inter disabled:opacity-50"
          >
            {isSending ? (
              <span className="flex items-center justify-center">
                <i className="fas fa-spinner fa-spin mr-2"></i>
                Sending...
              </span>
            ) : (
              "Send Messages"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;