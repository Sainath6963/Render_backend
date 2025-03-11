export const generateToken = (user, message, statusCode, res) => {
  try {
    if (!user || typeof user.generateJsonWebToken !== "function") {
      console.error("❌ User or generateJsonWebToken function is missing!");
      return res
        .status(500)
        .json({ success: false, message: "JWT generation failed!" });
    }

    const token = user.generateJsonWebToken();
    console.log("✅ Token Generated:", token);

    res
      .status(statusCode)
      .cookie("token", token, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      })
      .json({
        success: true,
        message,
        token,
        user,
      });
  } catch (error) {
    console.error("❌ Error generating token:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
