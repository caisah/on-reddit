BUILD_DIR="build"

if [ -d $BUILD_DIR ]; then
    echo "Removing build dir..."
    rm -rf build
    echo "Done."
fi

