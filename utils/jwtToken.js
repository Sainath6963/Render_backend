export const generateToken = (user, message, statusCode, res) => {
  // Check if user and method exist
  if (!user || typeof user.generateJsonWebToken !== "function") {
    return res
      .status(500)
      .json({ success: false, message: "JWT generation failed!" });
  }

  const token = user.generateJsonWebToken();
  console.log("Generated Token:", token);
  // Ensure COOKIE_EXPIRES is valid
  const cookieExpireDays = Number(process.env.COOKIE_EXPIRES) || 7;

  res
    .status(statusCode)
    .cookie("token", token, {
      expires: new Date(Date.now() + cookieExpireDays * 24 * 60 * 60 * 1000),
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
};
