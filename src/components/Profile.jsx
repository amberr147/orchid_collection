import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { setUser } from "../features/user/userSlice";

export default function Profile() {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const [displayName, setDisplayName] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (user) {
            setDisplayName(user.displayName || "");
            setPhotoURL(user.photoURL || "");
        }
    }, [user]);

    // Load user từ localStorage nếu mất
    useEffect(() => {
        if (!user) {
            const localUser = localStorage.getItem("user");
            if (localUser) {
                dispatch(setUser(JSON.parse(localUser)));
            }
        }
    }, [user, dispatch]);

    if (!user) {
        return (
            <div className="container py-5 text-center">
                <h3>You need to login first.</h3>
            </div>
        );
    }

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        try {
            await updateProfile(auth.currentUser, {
                displayName,
                photoURL,
            });
            // cập nhật Redux user state
            const updatedUser = { ...auth.currentUser };
            dispatch(setUser(updatedUser));
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setMessage("✅ Profile updated successfully!");
        } catch (error) {
            console.error(error);
            setMessage("❌ Failed to update profile.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-5" style={{ maxWidth: "600px" }}>
            <h2 className="text-center mb-4">My Profile</h2>
            <div className="card shadow p-4">
                <form onSubmit={handleSave}>
                    <div className="mb-3 text-center">
                        <img
                            src={photoURL || "https://via.placeholder.com/120"}
                            alt="avatar"
                            style={{
                                width: "120px",
                                height: "120px",
                                borderRadius: "50%",
                                objectFit: "cover",
                                marginBottom: "10px",
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Display Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            placeholder="Your name"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Photo URL</label>
                        <input
                            type="text"
                            className="form-control"
                            value={photoURL}
                            onChange={(e) => setPhotoURL(e.target.value)}
                            placeholder="Link to your profile photo"
                        />
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? "Saving..." : "Save Changes"}
                        </button>
                    </div>

                    {message && (
                        <p className="text-center mt-3" style={{ fontWeight: "500" }}>
                            {message}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}
